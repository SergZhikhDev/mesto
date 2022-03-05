import Card from './Card.js';

import FormValidator from './FormValidator.js';
//import {posterPopup, Card} from './Card.js';

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
/*class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._alt = "на фотографии " + data.name;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    const cardElement = document
      .querySelector(".item_template")
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._alt;
    this._element.querySelector(".element__title").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__hart")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".openPopupBtn__poster")
      .addEventListener("click", () => {
        this._openImage();
      });
  }

  _likeCard() {
    this._element
      .querySelector(".element__hart")
      .classList.toggle("element__hart_active");
  }

  _deleteCard() {
    this._element
      .querySelector(".element__basket")
      .closest(".element")
      .remove();
  }

  _openImage() {
    posterImage.src = this._link;
    posterImage.alt = this._alt;
    posterTitle.textContent = this._name;


    openPopup(posterPopup);
  }
}*/

const listCards = document.querySelector(".elements"); // список карточек изнаяально пустой, наполняется изначально из массива
const templateItem = document.querySelector(".item_template").content; // шаблон html разметка карточки
const posterImage = document.querySelector(".poster__image");
const elementImage = templateItem.querySelector(".element__image");
const posterTitle = document.querySelector(".poster__name");
const placeNameInput = document.querySelector("#place"); //первая полоса ввода формы Новое место(Add)
const placeLinkInput = document.querySelector("#placeLink"); //вторая полоса ввода формы Новое место(Add)
const formInput = document.querySelectorAll(".form__input-area");
const nameInput = document.querySelector(".form__input-area_name"); //первая полоса ввода форм(Edit)
const jobInput = document.querySelector(".form__input-area_about-self"); //вторая полоса ввода форм(Edit)
const profInfoName = document.querySelector(".profile-info__name"); //
const profInfoAboutSelf = document.querySelector(".profile-info__about-self"); //
const profilePopup = document.querySelector(".profilePopup"); // попап блока редактировать профиль
const cardPopup = document.querySelector(".cardPopup"); //попап блока добавить карточку
const posterPopup = document.querySelector(".popup_poster"); //попап постера (большой фотографии)
const formEdit = document.querySelector(".form_edit-block"); //кнопка сохранения формы редактировать профиль
const formAdd = document.querySelector(".form_add-block"); //кнопка сохранения формы добавить карточку
const openPopupEditButton = document.querySelector(".profile-info__edit-button"); //кнопка открытия формы редактировать профиль
const openPopupAddButton = document.querySelector(".profile__add-button"); //кнопка открытия формы добавить карточку
const popupCloseButtons = document.querySelectorAll(".popup__close");
// const popupEditBlockCloseButton = document.querySelector(".popup__close_edit-block"); //кнопка закрытия формы редактировать профиль
// const popupAddBlockCloseButton = document.querySelector(".popup__close_add-block"); //кнопка закрытия формы добавить карточку
// const popupPosterCloseButton = document.querySelector(".popup__close_poster"); // кнопка закрытия попапа
 console.log(elementImage)

const enableValidation = {
  formSelector: '.form',
  inputSelector: '.form__input-area',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: "popup_error_visible"
};


initialCards.forEach((item) => {
    listCards.append( new Card(item).generateCard(item));
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEscape);
}

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

const closeWithEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

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
const validateAddBlock= new FormValidator(enableValidation, formAdd);
validateEditBlock.enableValidation();
validateAddBlock.enableValidation();
