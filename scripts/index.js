const profileOpenPopupButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
//const popupContainer = document.querySelector(".popup__container");
//const submitBtn = document.querySelector(".form__handlers");
let formElement = document.querySelector(".form");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#about-self");

let profInfoName = document.querySelector(".profile-info__name");
let profInfoAboutSelf = document.querySelector(".profile-info__about-self");


function openPopup() {
  popup.classList.add("popup_opened");
}


function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  closePopup();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
}

profileOpenPopupButton.addEventListener("click", openPopup);

popupCloseButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);

//submitBtn.addEventListener("click", closePopup);

//popupContainer.addEventListener("Enter", closePopup);


/*let formElement = document.querySelector(".form");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#about-self");

let profInfoName = document.querySelector(".profile-info__name");
let profInfoAboutSelf = document.querySelector(".profile-info__about-self");*/

/*function formSubmitHandler(evt) {
  evt.preventDefault();
  closePopup();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
}

formElement.addEventListener("submit", formSubmitHandler);*/
