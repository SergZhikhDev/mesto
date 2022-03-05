export default class FormValidator {
  constructor(enableValidation, formElement) {
    this._formSelector = enableValidation.formSelector;
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;

    this._formElement = formElement;

    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }
  _showInputError = (inputElement, errorMessage) => {
    const _errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.textContent = errorMessage;
  };
 _hideInputError = (inputElement) => {
    const _errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.textContent = "";
  };

  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _setEventListeners () {
    // проверяем состояние кнопки в самом начале
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      // проверяем заполнены ли поля и делаем предварительную проверку в самом начале
      inputElement.value ? this._checkInputValidity(inputElement) : '';

      // валидируем при изменении полей
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add("form__button_disabled"); //1
      this._buttonElement.setAttribute("disabled", "");

    } else {
      this._buttonElement.classList.remove("form__button_disabled");
      this._buttonElement.removeAttribute("disabled");
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  };

}





