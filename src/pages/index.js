import "./index.css";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { initialCards } from "../scripts/utils/initdate.js";
import {
  nameInput,
  jobInput,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  config,
  selectors,
} from "../scripts/utils/constants.js";

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

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

function handleCardClick(data) {
  popupPoster.open(data);
}

btnOpenPopupEdit.addEventListener("click", () => {
  const { userName, aboutSelf } = userInfo.getUserInfo();
  nameInput.value = userName;
  jobInput.value = aboutSelf;
  formValidators["editProfileForm"].resetErrorMessage();
  popupEditProfileForm.open();
});

btnOpenPopupAdd.addEventListener("click", () => {
  formValidators["addCardForm"].resetErrorMessage();
  popupAddCardForm.open();
});

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo(data);
  popupEditProfileForm.close();
}

function handleAddFormSubmit(values) {
  values.name = values["place"];
  values.link = values["placeLink"];
  defaultCardList.prependCard(createCard(values));
  popupAddCardForm.close();
}

defaultCardList.renderItems();
