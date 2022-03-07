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
const formsInput = document.querySelectorAll(".form__input-area");
const nameInput = document.querySelector(".form__input-area_name"); //первая полоса ввода форм(Edit)
const jobInput = document.querySelector(".form__input-area_about-self"); //вторая полоса ввода форм(Edit)
const profInfoName = document.querySelector(".profile-info__name"); //
const profInfoAboutSelf = document.querySelector(".profile-info__about-self"); //
const profilePopup = document.querySelector(".profilePopup"); // попап блока редактировать профиль
const cardPopup = document.querySelector(".cardPopup"); //попап блока добавить карточку
const formEdit = document.querySelector(".form_edit-block"); //кнопка сохранения формы редактировать профиль
const formAdd = document.querySelector(".form_add-block"); //кнопка сохранения формы добавить карточку
const openPopupEditButton = document.querySelector(".profile-info__edit-button"); //кн.откр.формы редакт. профиль
const openPopupAddButton = document.querySelector(".profile__add-button"); //кнопка открытия формы добавить карточку
const popupCloseButtons = document.querySelectorAll(".popup__close");
const posterImage = document.querySelector(".poster__image");
const posterTitle = document.querySelector(".poster__name");
const posterPopup = document.querySelector(".popup_poster");

const enableValidation = {
  formSelector: ".form",
  inputSelector: ".form__input-area",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: "popup_error_visible",
};

initialCards.forEach((item) => {
  listCards.append(new Card(item, openImage).generateCard(item));
});

function openImage(name, link) {
  posterImage.src = link;
  posterImage.alt = name;
  posterTitle.innerText = name;
  openPopup(posterPopup);
}

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

  listCards.prepend(new Card(data, openImage).generateCard(data));
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
openPopupEditButton.addEventListener("click", () => {
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
  reset();
  openPopup(profilePopup);
});

openPopupAddButton.addEventListener("click", () => {
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

    formsInput.forEach((item) => {
      item.classList.remove("form__input-area_error");
    });
  });
}

const validateEditBlock = new FormValidator(enableValidation, formEdit);
const validateAddBlock = new FormValidator(enableValidation, formAdd);
validateEditBlock.enableValidation();
validateAddBlock.enableValidation();
