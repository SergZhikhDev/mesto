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
const listForms = document.querySelector(".forms"); // список форм
const input = document.querySelector(".form__input");
const button = document.querySelector(".form__submit");
const templateItem = document.querySelector(".item_template").content; // html разметка карточки
console.log(templateItem);
//const templateForm = document.querySelector(".popup_template").content; //html разметка форм
const openPopupEditButton = document.querySelector(".profile-info__edit-button"); // кнопка открытия формы №1
const openPopupAddButton = document.querySelector(".profile__add-button"); // кнопка открытия формы №2

//функция перебирает значения карточек "из коробки"
function render() {
  initialCards.forEach(renderItem);
}

//ф. создает новую карточку со значениями "из коробки" и создает попап с увеличенной картинкой со значениями из коробки
function renderItem(item) {
  const newItemFromBox = templateItem.cloneNode(true);
  //const newPosterItem = templatePosters.cloneNode(true);

  newItemFromBox.querySelector(".element__image").setAttribute("src", item.link); //присвоение атрибута
  newItemFromBox.querySelector(".element__image").setAttribute("alt", "на фотографии " + item.name); // склеивает фразу "на фотографии + имя карточки"
  newItemFromBox.querySelector(".element__title").innerText = item.name; // замена текста

 // addListeners(newItemFromBox); // добавляет слушателя новому элементу
  listCards.append(newItemFromBox); // добавляет карточку в конец списка
}

render();

const cardTemplate = document.querySelector(".item_template").content;
const newPoster = cardTemplate.querySelector(".element").cloneNode(true);
const popup = document.querySelectorAll(".popup");
const profilePopup = document.querySelector(".profilePopup");
const cardPopup = document.querySelector(".cardPopup");
const popupPoster = document.querySelector(".posterPopup");
const popupCloseButton = document.querySelector(".popup__close");
const formEditElement = document.querySelector(".profilePopup");
const formAddElement = document.querySelector(".cardPopup");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-self");
const profInfoName = document.querySelector(".profile-info__name");
const profInfoAboutSelf = document.querySelector(".profile-info__about-self");
const placeNameInput = document.querySelector("#place");
const placeLinkInput = document.querySelector("#placeLink");
const placeNameAdded = document.querySelectorAll(".element__title");
const placeLinkAdded = document.querySelectorAll(".element__image");


function openPopup() {
  // event.target.classList.add("popup-opened");
  cardPopup.classList.add("popup_opened");
  profilePopup.classList.add("popup_opened");
  popupPoster.classList.add("popup_opened");
}

// слушатель запускает ф-ию открыть первую формы по клику на edit-buton на add-buton
openPopupEditButton.addEventListener("click", openPopup);
openPopupAddButton.addEventListener("click", openPopup);



/*document.querySelector("#elements").addEventListener("click", function (event) {     // Вешаем обработчик клика на UL, не LIПолучили ID, т.к. в e.target содержится элемент по которому кликнули
      document.querySelector(".poster__image").setAttribute("src", event.target.src);
      document.querySelector(".poster__image").setAttribute("alt", event.target.alt);
     console.log('.poster__name');
      document.querySelector(".poster__name").textContent = event.target.alt.replace("на фотографии",' ');
    });


document.querySelector(".profile").addEventListener("click", function () {
  // event.target.classList.toggle("popup-opened");

  document.querySelector(".profilePopup").setAttribute('class','popup popup-opened')
})


// функция закрывает попап
function closePopup() {
  profilePopup.classList.remove("popup_opened");
  cardPopup.classList.remove("popup_opened");
  popupPoster.classList.remove("popup_opened");
}*/

// функция добавить новую карточку перед остальными
function renderNewItem(evt) {
  const newItem = templateItem.cloneNode(true);
  evt.preventDefault();

  newItem
    .querySelector(".element__image")
    .setAttribute("src", placeLinkInput.value); //присвоение атрибута
  newItem
    .querySelector(".element__image")
    .setAttribute("alt", "на фотографии " + placeLinkAdded.alt); // склеивает фразу "на фотографии + имя карточки"
  newItem.querySelector(".element__title").textContent = placeNameInput.value; // замена текста

  addListeners(newItem); // добавляет слушателя новому элементу
  listCards.prepend(newItem); // добавляет новую карточку на первое место
  if (elements.children.length > 6) {
    // без этого количество карточек может быть любым
    lastCardDelete();
  }
  closePopup();
}
/*
// функция удаляет последн карточку
function lastCardDelete() {
  const elements = document.querySelector(".elements");
  elements.removeChild(elements.children[6]);
}

// функция сохраняет данные первой формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup();
}











//слушатель запускает ф-ию закрыть  форму по клику на close-buton
popupEditBlockCloseButton.addEventListener("click", closePopup);
popupAddBlockCloseButton.addEventListener("click", closePopup);
posterCloseButton.addEventListener("click", closePopup);

//слушатель на кнопку "submit"
formEditElement.addEventListener("submit", formSubmitHandler);
formAddElement.addEventListener("submit", renderNewItem);

// функция добавляет слушатель на элементы карточки
function addListeners(el) {
  el.querySelector(".element__basket").addEventListener("click", handleDelete);
  el.querySelector(".element__hart").addEventListener("click", handlelike);
  el.querySelector(".element__image").addEventListener(
    "click",
    openPopup
  );
}

// функция удаляет карточку
function handleDelete(event) {
  event.target.closest(".element").remove();
}

// функция переключает вид сердечка белый/темный
function handlelike(event) {
  event.target.classList.toggle("element__hart_active");
}
*/
