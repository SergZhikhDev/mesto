//import {openPopup} from'./index.js';


export class Card {
  constructor(data,openImage) {
    this._name = data.name;
    this._link = data.link;
    this._alt = "на фотографии " + data.name;
    this._openImage = openImage;
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
    // this._element
    //   .querySelector(".openPopupBtn__poster")
    //   .addEventListener("click", () => {
    //     this._openImage();
    //   });
      this._element
      .querySelector(".openPopupBtn__poster").addEventListener('click', () => {
        this._openImage(this._name, this._link)})




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

  /*_openImage() {
    const posterImage = document.querySelector(".poster__image");
    const posterTitle = document.querySelector(".poster__name");
    const posterPopup = document.querySelector(".popup_poster");

    posterImage.src = this._link;
    posterImage.alt = this._alt;
    posterTitle.textContent = this._name;

    openPopup(posterPopup);
  }*/





  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();
    this._elementImage = this._element.querySelector('.element__image')

    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._element.querySelector(".element__title").textContent = this._name;


    return this._element;
  }
}
