import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    // this._submitForm = this._submitForm.bind(this);
    console.log(this._form)
  }

   //НЕ ПОНЯЛ ДЛЯ ЧЕГО НУЖЕН ЭТОТМЕТОД
  _getInputValues() {
    const data = {};
    Array.from(
      this._form.querySelectorAll(".form__input-area")).forEach((item) => {
      data[item.name] = item.value;

    });
    return data;

  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit);

  }

  close() {
    super.close();
    this._form.reset();
  }
}
