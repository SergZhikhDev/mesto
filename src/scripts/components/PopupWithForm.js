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

    // this.setInputValues = this.setInputValues.bind(this);
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

  // setInputValues(data) {
  //   this._inputList.forEach((input) => {
  //     input.value = data[input.name];
  //   });
  // }
  /* Возможно не прав, не стал применять этот метод, т.к. импуты формы Edit  при открытии
заполняются userInfo.getUserInfo(), а инпуты Add должны быть пустыми*/

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.submitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
