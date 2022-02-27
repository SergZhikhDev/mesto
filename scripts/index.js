const initialCards = [
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
const listCards = document.querySelector(".elements"); // список карточек изнаяально пустой, наполняется изначально из массива
const templateItem = document.querySelector(".item_template").content; // шаблон html разметка карточки
const posterImage = document.querySelector(".poster__image");
const posterTitle = document.querySelector(".poster__name");
const placeNameInput = document.querySelector("#place"); //первая полоса ввода формы Новое место(Add)
const placeLinkInput = document.querySelector("#placeLink"); //вторая полоса ввода формы Новое место(Add)
const formInput = document.querySelectorAll(".form__input-area");
const nameInput = document.querySelector(".form__input-area_name"); //первая полоса ввода форм(Edit)
const jobInput = document.querySelector(".form__input-area_about-self"); //вторая полоса ввода форм(Edit)
const profInfoName = document.querySelector(".profile-info__name"); //
const profInfoAboutSelf = document.querySelector(".profile-info__about-self"); //
const profilePopup = document.querySelector(".profilePopup"); // попап блока редактировать профиль
const cardPopup = document.querySelector(".cardPopup"); //попап блока добавить карточку
const posterPopup = document.querySelector(".popup_poster"); //попап постера (большой фотографии)
const formEdit = document.querySelector(".form_edit-block"); //кнопка сохранения формы редактировать профиль
const formAdd = document.querySelector(".form_add-block"); //кнопка сохранения формы добавить карточку
const openPopupEditButton = document.querySelector(
  ".profile-info__edit-button"
); //кнопка открытия формы редактировать профиль
const openPopupAddButton = document.querySelector(".profile__add-button"); //кнопка открытия формы добавить карточку
const popupCloseButtons = document.querySelectorAll(".popup__close");
const popupEditBlockCloseButton = document.querySelector(
  ".popup__close_edit-block"
); //кнопка закрытия формы редактировать профиль
const popupAddBlockCloseButton = document.querySelector(
  ".popup__close_add-block"
); //кнопка закрытия формы добавить карточку
const popupPosterCloseButton = document.querySelector(".popup__close_poster"); // кнопка закрытия попапа


//функция перебирает значения карточек "из коробки"
function render() {
  initialCards.forEach(addCardAppend);
}
render();

//ф. создает новую карточку со значениями "из коробки"
function createCard(item) {
  const cardElement = templateItem.cloneNode(true);

  cardElement.querySelector(".element__image").setAttribute("src", item.link); //присвоение атрибута
  cardElement
    .querySelector(".element__image")
    .setAttribute("alt", "на фотографии " + item.name); // склеивает фразу "на фотографии + имя карточки"
  cardElement.querySelector(".element__title").textContent = item.name; // замена текста

  addListeners(cardElement); // добавляет слушателя новому элементу

  return cardElement;
}

//Готовые карточки добавляем в конец DOM
function addCardAppend(data) {
  listCards.append(createCard(data));
}

//Готовые карточки добавляем в начало DOM
function addCardPrepend(data) {
  listCards.prepend(createCard(data));
}

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

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  addCardPrepend(cardData);
  closePopup(cardPopup);
}



function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeWithEscape);

}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeWithEscape);
}

//Постер попап
function openImage(event) {
  posterImage.src = event.target.src;
  posterImage.alt = event.target.alt;
  posterTitle.innerText = event.target.alt;

  openPopup(posterPopup);
}

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
openPopupEditButton.addEventListener("click", () => {
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
 reset();
  openPopup(profilePopup);
});

openPopupAddButton.addEventListener("click", () => {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  reset();

  openPopup(cardPopup);
});


//слушатель на кнопку "submit"

formEdit.addEventListener("submit", handleProfileFormSubmit);
formAdd.addEventListener("submit", handleAddFormSubmit);

// функция добавляет слушатель на элементы карточки
function addListeners(el) {
  el.querySelector(".element__basket").addEventListener("click", deleteCard);
  el.querySelector(".element__hart").addEventListener("click", likeCard);
  el.querySelector(".openPopupBtn__poster").addEventListener("click", () =>
    openImage(event)
  );
}

// функция удаляет карточку
function deleteCard(event) {
  event.target.closest(".element").remove();
}

// функция переключает вид сердечка белый/темный
function likeCard(event) {
  event.target.classList.toggle("element__hart_active");
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest(".popup");

  button.addEventListener("click", () => closePopup(popup));

  popup.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  });
});

const closeWithEscape = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
console.log(hasInvalidInput)
