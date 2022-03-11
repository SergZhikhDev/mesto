import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initdate.js";

const listCards = document.querySelector(".elements"); // список карточек изнаяально пустой, наполняется изначально из массива

const placeNameInput = document.querySelector("#place"); //первая полоса ввода формы Новое место(Add)
const placeLinkInput = document.querySelector("#placeLink"); //вторая полоса ввода формы Новое место(Add)

const nameInput = document.querySelector("#userName"); //первая полоса ввода форм(Edit)
const jobInput = document.querySelector("#about-self"); //вторая полоса ввода форм(Edit)

const profInfoName = document.querySelector(".profile-info__userName"); //
const profInfoAboutSelf = document.querySelector(".profile-info__about-self"); //

const profilePopup = document.querySelector(".popup_type_edit-profile"); // попап блока редактировать профиль
const cardPopup = document.querySelector(".popup_type_cardPopup"); //попап блока добавить карточку

const formEdit = document.querySelector(".form_type_edit-profile"); //кнопка сохранения формы редактировать профиль
const formAdd = document.querySelector(".form_type_add-block"); //кнопка сохранения формы добавить карточку

const btnOpenPopupEdit = document.querySelector(".profile-info__edit-button"); //кнопка открытия формы редактировать профиль
const btnOpenPopupAdd = document.querySelector(".profile__add-button"); //кнопка открытия формы добавить карточку

export const posterTitle = document.querySelector(".poster__name");
export const posterImage = document.querySelector(".poster__image");
export const posterPopup = document.querySelector(".popup_type_poster");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const enableValidation = {
  inputSelector: ".form__input-area",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: ".popup__error",
};

const validatorEditBlock = new FormValidator(enableValidation, formEdit);
const validatorAddBlock = new FormValidator(enableValidation, formAdd);

validatorEditBlock.enableValidation();
validatorAddBlock.enableValidation();

initialCards.forEach((item) => {
  listCards.append(
    new Card(item, ".card-template_type_default").generateCard()
  );
});

// функция сохраняет данные первой формы
function handleProfileFormSubmit(event) {
  event.preventDefault();

  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup(profilePopup);
}

// функция сохраняет данные второй формы
function handleAddFormSubmit(event) {
  event.preventDefault();
  // event.target.reset();
  const data = {};
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  listCards.prepend(
    new Card(data, ".card-template_type_default").generateCard()
  );
  closePopup(cardPopup);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEscape);
}
const closeWithEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
btnOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
  validatorEditBlock.enableFormButton();
  validatorEditBlock.resetErrorMessage();
  openPopup(profilePopup);
});

btnOpenPopupAdd.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  validatorAddBlock.disableFormButton();
  validatorAddBlock.resetErrorMessage();
  openPopup(cardPopup);
});

//слушатель на кнопку "submit"

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddFormSubmit);

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});
