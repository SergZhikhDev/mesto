export default class FormValidator {
  constructor(enableValidation, formElement) {
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  _showInputError = (inputElement, errorMessage) => {
    const _errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    const _errorElement = this._formElement.querySelector(
      `#error-${inputElement.id}`
    );
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _setEventListeners() {
    // проверяем состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      // проверяем заполнены ли поля и делаем предварительную проверку в самом начале
      inputElement.value ? this._checkInputValidity(inputElement) : "";

      // валидируем при изменении полей
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
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
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  resetErrorMessage() {
    document.querySelectorAll(this._errorClass).forEach((item) => {
      item.textContent = "";
    });

    document.querySelectorAll(this._inputSelector).forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    });
  }
}
