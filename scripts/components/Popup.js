export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickClose = this._handleClickClose.bind(this);
  }
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (
   evt.target.classList.contains('popup') ||
   evt.target.classList.contains('popup__close')
    ) {
        this.close();
    }
   }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

//   _removeEventListeners() {
//     this._popup.removeEventListener('mousedown', this._handleClickClose);
//     document.removeEventListener('keydown', this._handleEscClose);
// }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    // this._removeEventListeners()
  }
}
