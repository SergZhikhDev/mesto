const initialCards = [
  // значения для карточек "из коробки"
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const listCards = document.querySelector(".elements"); // список карточек
const templateItem = document.querySelector(".item_template").content; // html разметка карточки
const openPopupEditButton = document.querySelector(".profile-info__edit-button"); // кнопка открытия формы №1
const openPopupAddButton = document.querySelector(".profile__add-button"); // кнопка открытия формы №2
const placeNameInput = document.querySelector("#place");
const placeLinkInput = document.querySelector("#placeLink");
const placeLinkAdded = document.querySelectorAll(".element__image");
const cardTemplate = document.querySelector(".item_template").content;
const newPoster = cardTemplate.querySelector(".element").cloneNode(true);
const profilePopup = document.querySelector(".profilePopup");
const cardPopup = document.querySelector(".cardPopup");
const formEditElement = document.querySelector(".profilePopup");
const formAddElement = document.querySelector(".cardPopup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-self");
const profInfoName = document.querySelector(".profile-info__name");
const profInfoAboutSelf = document.querySelector(".profile-info__about-self");

//функция перебирает значения карточек "из коробки"
function render() {
  initialCards.forEach(renderItem);
}

//ф. создает новую карточку со значениями "из коробки"
function renderItem(item) {
  const newItemFromBox = templateItem.cloneNode(true);
  //const newPosterItem = templatePosters.cloneNode(true);

  newItemFromBox.querySelector(".element__image").setAttribute("src", item.link); //присвоение атрибута
  newItemFromBox.querySelector(".element__image").setAttribute("alt", "на фотографии " + item.name); // склеивает фразу "на фотографии + имя карточки"
  newItemFromBox.querySelector(".element__title").innerText = item.name; // замена текста

  newItemFromBox.querySelector(".poster__image").setAttribute("src", item.link); //присвоение атрибута
  newItemFromBox.querySelector(".poster__image").setAttribute("alt", "на фотографии " + item.name); // склеивает фразу "на фотографии + имя карточки"
  newItemFromBox.querySelector(".poster__name").innerText = item.name; // замена текста

  addListeners(newItemFromBox); // добавляет слушателя новому элементу
  listCards.append(newItemFromBox); // добавляет карточку в конец списка
}
render();

function createCard(evt) {
  const newItem = templateItem.cloneNode(true);
  evt.preventDefault();

  newItem.querySelector(".element__image").setAttribute("src", placeLinkInput.value); //присвоение атрибута
  newItem.querySelector(".element__image").setAttribute("alt", "на фотографии " + placeLinkAdded.alt); // склеивает фразу "на фотографии + имя карточки"
  newItem.querySelector(".element__title").textContent = placeNameInput.value; // замена текста*/

  newItem.querySelector(".poster__image").setAttribute("src", placeLinkInput.value); //присвоение атрибута
  newItem.querySelector(".poster__image").setAttribute("alt", "на фотографии " + placeLinkAdded.alt); // склеивает фразу "на фотографии + имя карточки"
  newItem.querySelector(".poster__name").textContent = placeNameInput.value;

  addListeners(newItem); // добавляет слушателя новому элементу
  listCards.prepend(newItem); // добавляет новую карточку на первое место
  if (elements.children.length > 6) {
    // без этого количество карточек может быть любым
    deleteLastCard();
  }
  closePopup();
}
// функция удаляет последн карточку
function deleteLastCard() {
  const elements = document.querySelector(".elements");
  elements.removeChild(elements.children[6]);
}


function openPopup(event) {
  event.target.previousElementSibling.classList.add("popup_opened");
}

function closePopup() {
  event.target.closest(".popup").classList.remove("popup_opened");
  profilePopup.classList.remove("popup_opened");
  cardPopup.classList.remove("popup_opened");

}

// функция сохраняет данные первой формы
function saveFormSubmit(evt) {
  evt.preventDefault();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup();
}

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
openPopupEditButton.addEventListener("click", openPopup);
openPopupAddButton.addEventListener("click", openPopup);

//слушатель запускает ф-ию закрыть  форму по клику на close-buton
popupEditBlockCloseButton.addEventListener("click", closePopup);
popupAddBlockCloseButton.addEventListener("click", closePopup);

//слушатель на кнопку "submit"
formEditElement.addEventListener("submit", saveFormSubmit);
formAddElement.addEventListener("submit", createCard);

// функция добавляет слушатель на элементы карточки
function addListeners(el) {
  el.querySelector(".element__basket").addEventListener("click", deleteCard);
  el.querySelector(".element__hart").addEventListener("click", likeCard);
  el.querySelector(".element__image").addEventListener("click", openPopup);
  el.querySelector(".popup__close").addEventListener("click", closePopup);
}

// функция удаляет карточку
function deleteCard(event) {
  event.target.closest(".element").remove();
}

// функция переключает вид сердечка белый/темный
function likeCard(event) {
  event.target.classList.toggle("element__hart_active");
}
