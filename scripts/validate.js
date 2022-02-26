const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });
  const fieldsetList = Array.from(
    document.querySelectorAll(settings.sectionSelector)
  );
  fieldsetList.forEach((fieldSet) => {
    setEventListeners(settings, fieldSet);
  });
};
const setEventListeners = (settings, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

  toggleButtonState(settings, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
};
const checkInputValidity = (settings, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(
      settings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (settings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(settings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", '');
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input-area",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: "popup_error_visible",
  sectionSelector: ".popupForms",
});
