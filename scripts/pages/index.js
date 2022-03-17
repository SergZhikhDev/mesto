import Section from '../components/Section.js';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../initdate.js";
import {
  listCards, placeNameInput, placeLinkInput, nameInput,
  jobInput, profInfoName, profInfoAboutSelf,profilePopup,
  cardPopup, formEdit, formAdd, btnOpenPopupEdit, btnOpenPopupAdd,
  popupCloseButtons, enableValidation,cardListSelector
} from '../utils/constants.js';




const validatorEditBlock = new FormValidator(enableValidation, formEdit);
const validatorAddBlock = new FormValidator(enableValidation, formAdd);


const defaultCardList = new Section({ items:initialCards,
  renderer: (item) => {
  const card = new Card(item, ".card-template_type_default");
 const cardElement = card.generateCard();
defaultCardList.addItem(cardElement);
   }
 }, cardListSelector);


console.log(cardListSelector)








// функция сохраняет данные первой формы
function handleProfileFormSubmit(event) {
  event.preventDefault();

  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup(profilePopup);
}

// функция сохраняет данные второй формы
function handleAddFormSubmit(event) {
  event.preventDefault();
  // event.target.reset();
  const data = {};
  data.name = placeNameInput.value;
  data.link = placeLinkInput.value;

  listCards.prepend(
    new Card(data, ".card-template_type_default").generateCard()
  );
  closePopup(cardPopup);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEscape);
}
const closeWithEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
btnOpenPopupEdit.addEventListener("click", () => {
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
  validatorEditBlock.enableFormButton();
  validatorEditBlock.resetErrorMessage();
  openPopup(profilePopup);
});

btnOpenPopupAdd.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  validatorAddBlock.disableFormButton();
  validatorAddBlock.resetErrorMessage();
  openPopup(cardPopup);
});

//слушатель на кнопку "submit"

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddFormSubmit);

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});
validatorEditBlock.enableValidation();
validatorAddBlock.enableValidation();
defaultCardList.renderItems ();
