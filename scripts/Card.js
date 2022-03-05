


export default class Card {
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


    this._element
      .querySelector(".poster__image").setAttribute('src',this.link);
   // posterImage.src = this._link;
   this._element
   .querySelector(".poster__image").setAttribute('alt',this._name);
    // posterImage.alt = this._alt;
    this._element
    .querySelector(".poster__image").textContent = this._name;
    // posterTitle.textContent = this._name;


    openPopup(posterPopup);
  }
}


