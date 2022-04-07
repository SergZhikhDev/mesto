import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this.submitHandler = this.submitHandler.bind(this);
    this._inputList = Array.from(
      this._form.querySelectorAll(".form__input-area")
    );
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  submitHandler() {
    this._handleFormSubmit(this._getInputValues());
  }

changeSubmitHandler(newSubmitHandler){
  this._handleFormSubmit = newSubmitHandler
}

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.submitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
