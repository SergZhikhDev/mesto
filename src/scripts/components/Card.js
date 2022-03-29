export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = "на фотографии " + data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  _setEventListeners() {
    this._elementHart.addEventListener("click", () => {
      this._likeCard();
    });
    this._elementBasket.addEventListener("click", () => {
      this._deleteCard();
    });
    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _likeCard() {
    this._elementHart.classList.toggle("element__heart_active");
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementHart = this._element.querySelector(".element__heart");
    this._elementBasket = this._element.querySelector(".element__basket");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}
