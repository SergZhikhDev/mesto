export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._form = formElement;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }
  _showInputError = (inputString, errorMessage) => {
    const _errorElement = this._form.querySelector(`#error-${inputString.id}`);
    inputString.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputString) => {

    const _errorElement = this._form.querySelector(`#error-${inputString.id}`);
    inputString.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputString) => {
      inputString.addEventListener("input", () => {
        this._checkInputValidity(inputString);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity = (inputString) => {
    if (!inputString.validity.valid) {
      this._showInputError(inputString, inputString.validationMessage);
    } else {
      this._hideInputError(inputString);
    }
  };

  disableFormButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "");
  }

  enableFormButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableFormButton();
    } else {
      this.enableFormButton();
    }
  }

  enableValidation() {
    this._form.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetErrorMessage() {
    this._toggleButtonState();
    this._inputList.forEach((inputString) => {
      this._hideInputError(inputString);
    });
  }
}
