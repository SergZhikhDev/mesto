import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../initdate.js";
import {
  listCards,
  placeNameInput,
  placeLinkInput,
  nameInput,
  jobInput,
  profInfoName,
  profInfoAboutSelf,
  profilePopup,
  cardPopup,
  btnFormEdit,
  btnFormAdd,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  popupCloseButtons,
  enableValidation,
  selectors,
} from "../utils/constants.js";

const validatorEditBlock = new FormValidator(enableValidation, btnFormEdit);
const validatorAddBlock = new FormValidator(enableValidation, btnFormAdd);

const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  selectors.cardListSelector
);



const popupPoster = new PopupWithImage(".popup_type_poster");

const popupEditProfileForm = new PopupWithForm(".popup_type_edit-profile", handleProfileFormSubmit);

const popupAddCardForm = new PopupWithForm(".popup_type_cardPopup", handleAddFormSubmit);

const userInfo = new UserInfo(
  selectors.userNameSelector,
   selectors.aboutSelfSelector,
   selectors.userNameNewSelector,
   selectors.aboutSelfNewSelector
   )

function createCard(item) {
  return new Card(
    item,
    ".card-template_type_default",
    handleCardClick
  ).generateCard();
}

function handleCardClick(data) {
  popupPoster.open(data);
}





// функция сохраняет данные первой формы
function handleProfileFormSubmit() {
  //  evt.preventDefault();
  //const userNewData = userInfo.setUserInfo();

  userInfo.setUserInfo();
  // profInfoName.textContent = nameInput.value;
  // profInfoAboutSelf.textContent = jobInput.value;

  popupEditProfileForm.close();
}



// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
btnOpenPopupEdit.addEventListener("click", () => {
userInfo.getUserInfo();



  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;

  validatorEditBlock.enableFormButton();
  validatorEditBlock.resetErrorMessage();
  popupEditProfileForm.open();

});










// функция сохраняет данные второй формы
function handleAddFormSubmit() {
 // event.preventDefault();
  // event.target.reset();
  const data = {};
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  listCards.prepend(
    new Card(data, ".card-template_type_default").generateCard()
  );
  popupAddCardForm.close();

}

// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeWithEscape);
// }

// function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeWithEscape);
// }
// const closeWithEscape = (event) => {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// };





btnOpenPopupAdd.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";


  validatorAddBlock.disableFormButton();
  validatorAddBlock.resetErrorMessage();
  //openPopup(cardPopup);
  popupAddCardForm.open();
});

//слушатель на кнопку "submit"

//sbtnFormEdit.addEventListener("submit", handleProfileFormSubmit);
//btnFormAdd.addEventListener("submit", handleAddFormSubmit);

// popupCloseButtons.forEach((button) => {
//   const popup = button.closest(".popup");

//   button.addEventListener("click", closePopup(popup));

//   popup.addEventListener("mousedown", (event) => {
//     if (event.target === event.currentTarget) {
//       closePopup(popup);
//     }
//   });
// });
validatorEditBlock.enableValidation();
validatorAddBlock.enableValidation();
defaultCardList.renderItems();
