export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._alt = "на фотографии " + data.name;
    this._likes = data.likes;
    this._id = data._id;
    this._userId = data.userId;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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
      this._handleLikeClick(this._id);
    });

    this._elementBasket.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(
      (user) => user._id === this._userId
    );
    return userHasLikedCard;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._elementlikeCount.textContent = this._likes.length;

    if (this.isLiked()) {
      this._filLike();
    } else {
      this._unfilLike();
    }
  }

  _filLike() {
    this._elementHart.classList.add("element__heart_active");
  }

  _unfilLike() {
    this._elementHart.classList.remove("element__heart_active");
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementHart = this._element.querySelector(".element__heart");
    this._elementBasket = this._element.querySelector(".element__basket");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementlikeCount = this._element.querySelector(".element__likeCount");
    this._elementImage.src = this._link;
    this._elementImage.alt = this._alt;
    this._elementTitle.textContent = this._name;
    this.setLikes(this._likes);
    if (this._ownerId !== this._userId) {
      this._elementBasket.style.display = "none";
    }
    this._setEventListeners();
    return this._element;
  }
}
