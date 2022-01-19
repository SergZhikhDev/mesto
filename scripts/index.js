const profileOpenPopupButton = document.querySelector(".edit-button");
const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close");
const popupContainer = document.querySelector(".popup__container");
const submitBtn = document.querySelector(".form__handlers");


function openPopup() {
  popup.classList.add("popup_opened");
}
profileOpenPopupButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}

popupCloseButton.addEventListener("click", closePopup);

submitBtn.addEventListener("click", closePopup);

popupContainer.addEventListener("Enter", closePopup);
