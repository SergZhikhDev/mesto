const enableValidation = (settings) => {
  const formsList = Array.from(document.querySelectorAll(settings.formSelector))
  formsList.forEach((formElement) => {
    formElement.addEventListener('submit', function(event) {
      event.preventDefault();
    })
  })
  formsList.forEach((formsList) => {
    setEventListeners(formsList, settings)

  })
}


const setEventListeners = (formsList, settings) => {
  const inputList = Array.from(formsList.querySelectorAll(settings.inputSelector))
  const buttonElement = formsList.querySelector(settings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(inputElement, settings)
      toggleButtonState(inputList, buttonElement);
    })
  })
}

const checkInputValidity = (inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, settings)
  } else {
    hideInputError(inputElement, settings)
  }
}

const showInputError = (inputElement, errorMessage, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.add(settings.inputErrorClass)
  errorElement.textContent = errorMessage
}

const hideInputError = (inputElement, settings) => {
  const errorElement = inputElement.nextElementSibling
  inputElement.classList.remove(settings.inputErrorClass)
  errorElement.textContent = ''
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__button_disabled')
    buttonElement.classList.remove('form__button')
    buttonElement.setAttribute('disabled', true)
  } else {
    buttonElement.classList.remove('form__button_disabled')
    buttonElement.classList.add('form__button')
    buttonElement.removeAttribute('disabled')
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-area',
  submitButtonSelector: '.form__button',
});
