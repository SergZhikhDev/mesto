import "./index.css";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/initdate.js";
import {
  placeNameInput,
  placeLinkInput,
  nameInput,
  jobInput,
  btnFormEdit,
  btnFormAdd,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  enableValidation,
  selectors,
} from "../scripts/utils/constants.js";

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
popupPoster.setEventListeners();

const popupEditProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
popupEditProfileForm.setEventListeners();

const popupAddCardForm = new PopupWithForm(
  ".popup_type_cardPopup",
  handleAddFormSubmit
);

popupAddCardForm.setEventListeners();

const userInfo = new UserInfo(selectors);

function createCard(data) {
  return new Card(
    data,
    ".card-template_type_default",
    handleCardClick
  ).generateCard();
}

// функция открывает постер попап
function handleCardClick(data) {
  popupPoster.open(data);
}

// функция сохраняет данные первой формы
function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);

  popupEditProfileForm.close();
}

// функция сохраняет данные второй формы
function handleAddFormSubmit(data) {
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  defaultCardList.prependItem(createCard(data));
  popupAddCardForm.close();
}

// console.log(submitHandler())
// слушатель запускает ф-ию открыть первую формы по клику на edit-buton
btnOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().about;

  validatorEditBlock.enableFormButton();
  validatorEditBlock.resetErrorMessage();
  popupEditProfileForm.open();
});

// слушатель запускает ф-ию открыть вторую формы по клику на add-butonна
btnOpenPopupAdd.addEventListener("click", () => {
  validatorAddBlock.disableFormButton();
  validatorAddBlock.resetErrorMessage();
  popupAddCardForm.open();
});

validatorEditBlock.enableValidation();
validatorAddBlock.enableValidation();
defaultCardList.renderItems();
