import { Card } from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const listCards = document.querySelector(".elements"); // список карточек изнаяально пустой, наполняется изначально из массива

const placeNameInput = document.querySelector("#place"); //первая полоса ввода формы Новое место(Add)
const placeLinkInput = document.querySelector("#placeLink"); //вторая полоса ввода формы Новое место(Add)

const formInput = document.querySelectorAll(".form__input-area");
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
  formSelector: ".form",
  inputSelector: ".form__input-area",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: "popup_error_visible",
};

initialCards.forEach((item) => {
  listCards.append(new Card(item).generateCard(item));
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
  const data = {};
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  listCards.prepend(new Card(data).generateCard(data));
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
  reset();
  openPopup(profilePopup);
});

btnOpenPopupAdd.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  reset();

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

function reset() {
  const subAddBtn = document.querySelector(".form__button_add-block");
  subAddBtn.classList.add("form__button_disabled");
  subAddBtn.setAttribute("disabled", "");

  const subEditBtn = document.querySelector(".form__button_edit-block");
  subEditBtn.classList.remove("form__button_disabled");
  subEditBtn.removeAttribute("disabled", "");

  const val = document.querySelectorAll(".popup__error");
  val.forEach((item) => {
    item.textContent = "";

    formInput.forEach((item) => {
      item.classList.remove("form__input-area_error");
    });
  });
}

const validateEditBlock = new FormValidator(enableValidation, formEdit);
const validateAddBlock = new FormValidator(enableValidation, formAdd);
validateEditBlock.enableValidation();
validateAddBlock.enableValidation();
