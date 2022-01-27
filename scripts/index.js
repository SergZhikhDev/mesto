const profileOpenPopupButton = document.querySelector(".profile-info__edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
let formElement = document.querySelector(".form");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#about-self");
let profInfoName = document.querySelector(".profile-info__name");
let profInfoAboutSelf = document.querySelector(".profile-info__about-self");


function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
}


function closePopup() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup();
}

profileOpenPopupButton.addEventListener("click", openPopup);

popupCloseButton.addEventListener("click", closePopup);

formElement.addEventListener("submit", formSubmitHandler);

