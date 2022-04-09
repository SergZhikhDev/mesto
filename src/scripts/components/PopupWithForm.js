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

    this.submitButton = this._popup.querySelector(".form__button");
    this.dontWorryButton = this._popup.querySelector(
      ".form__button-dont-worry"
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

  changeSubmitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit",this.submitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this.dontWorryButton.classList.add("form__button-dont-worry_visible");
  //  this.submitButton.classList.add("form__button_hidden");

    } else {
      this.dontWorryButton.classList.remove("form__button-dont-worry_visible");
     this.submitButton.classList.remove("form__button_hidden");

    }
  }
}
