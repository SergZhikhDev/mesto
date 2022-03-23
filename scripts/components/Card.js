// import { posterTitle, posterImage, posterPopup } from "../utils/constants.js";
// import { openPopup } from "../pages/index.js";

export class Card {
constructor(data, cardSelector, handleCardClick) {
   this._name = data.name;
   this._link = data.link;
    this._alt = "на фотографии " + data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // здесь выполним все необходимые операции, чтобы вернуть разметку
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    // вернём DOM-элемент карточки
    return cardElement;
  }
  _setEventListeners() {
    this._element
      .querySelector(".element__heart")
      .addEventListener("click", () => {
        this._likeCard();
      });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });

      });
  }

  _likeCard() {
    // не разобрался
    this._elementHart = this._element.querySelector(".element__heart");
    this._elementHart.classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  // _openImage() {
  //   posterImage.src = this._link;
  //   posterImage.alt = this._alt;
  //   posterTitle.textContent = this._name;

  //   openPopup(posterPopup);
  // }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector(".element__image");

    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}
