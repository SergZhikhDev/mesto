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
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input-area',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: "popup_error_visible",
});








function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {

    hideActivity(inputList, buttonElement)

  } else {


    showActivity(inputList, buttonElement)
  }
}


function hideActivity(inputList, buttonElement) {
  buttonElement.classList.add('form__button_disabled')//1
buttonElement.classList.remove('form__button')//1
buttonElement.setAttribute('disabled', '')
}//1

  function showActivity(inputList, buttonElement) {
    buttonElement.classList.remove('form__button_disabled')
    buttonElement.classList.add('form__button')
    buttonElement.removeAttribute('disabled')
  }


function reset() {
  const subAddBtn = document.querySelector(".form__button_add-block");
  subAddBtn.classList.add("form__button_disabled");//1
  subAddBtn.classList.remove('form__button')//1
  subAddBtn.setAttribute("disabled", "");//1

  const subEditBtn = document.querySelector(".form__button_edit-block");
  subEditBtn.classList.remove("form__button_disabled");
  subEditBtn.classList.add('form__button')
  subEditBtn.removeAttribute("disabled", "");

  const val = document.querySelectorAll(".popup__error");
  val.forEach((item) => {
    item.textContent = "";

formInput.forEach((item) =>{
  item.classList.remove('form__input-area_error')
})

  });
}
