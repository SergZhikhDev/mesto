 import './index.css'
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/initdate.js";
import {
  listCards,
  placeNameInput,
  placeLinkInput,
  nameInput,
  jobInput,
  profInfoName,
  profInfoAboutSelf,
  profilePopup,
  cardPopup,
  btnFormEdit,
  btnFormAdd,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  popupCloseButtons,
  enableValidation,
  selectors,
} from "../utils/constants.js";

const validatorEditBlock = new FormValidator(enableValidation, btnFormEdit);
const validatorAddBlock = new FormValidator(enableValidation, btnFormAdd);
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  selectors.cardListSelector
);
const popupPoster = new PopupWithImage(".popup_type_poster");
const popupEditProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
const popupAddCardForm = new PopupWithForm(
  ".popup_type_cardPopup",
  handleAddFormSubmit
);
const userInfo = new UserInfo(
  selectors.userNameSelector,
  selectors.aboutSelfSelector,
  selectors.userNameNewSelector,
  selectors.aboutSelfNewSelector
);

function createCard(item) {
  return new Card(
    item,
    ".card-template_type_default",
    handleCardClick
  ).generateCard();
}

function handleCardClick(data) {
  popupPoster.open(data);
}

// функция сохраняет данные первой формы
function handleProfileFormSubmit() {
  userInfo.setUserInfo();
  popupEditProfileForm.close();
}

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
btnOpenPopupEdit.addEventListener("click", () => {
  userInfo.getUserInfo();

  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;

  validatorEditBlock.enableFormButton();
  validatorEditBlock.resetErrorMessage();
  popupEditProfileForm.open();
});

// функция сохраняет данные второй формы
function handleAddFormSubmit() {
  const data = {};
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  listCards.prepend(
    new Card(data, ".card-template_type_default").generateCard()
  );
  popupAddCardForm.close();
}

btnOpenPopupAdd.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";

  validatorAddBlock.disableFormButton();
  validatorAddBlock.resetErrorMessage();
  popupAddCardForm.open();
});

validatorEditBlock.enableValidation();
validatorAddBlock.enableValidation();
defaultCardList.renderItems();
