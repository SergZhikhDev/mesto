import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._poster = this._popup.querySelector(".poster__image");
    this._posterTitle = this._popup.querySelector(".poster__name");
  }

  open({ name, link}) {
    this._poster.src = link;
    this._poster.alt = name;
    this._posterTitle.textContent = name;
    super.open();
  }
}
