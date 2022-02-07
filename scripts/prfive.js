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

const formAreas = [
  {
    formName: "editForm",
    idn: "edit",
    title: "Редактировать профиль",
    nameFstLine: "name",
    idFstLine: "name",
    PlaceHoldFstLine: "Введите имя",
    ValueFstLine: "Жак-Ив Кусто",

    nameSndLine: "about-self",
    type: "text",
    idSndLine: "about-self",
    PlaceHoldSndtLine: "Введите род деятельности",
    ValueSndLine: "Исследователь океана",

    label: "Сохранить",
    labelId: "popupEditBlockCloseButton",
  },

  {
    formName: "addForm",
    idn: "add",
    title: "Новое место",
    nameFstLine: "place",
    idFstLine: "place",
    PlaceHoldFstLine: "Название",
    ValueFstLine: "",

    nameSndLine: "placeLink",
    type: "url",
    idSndLine: "placeLink",
    PlaceHoldSndLine: "Введите ссылку",
    ValueSndLine: "",

    label: "Создать",
    labelId: "popupAddBlockCloseButton",
  },
];

const listCards = document.querySelector(".elements"); // список карточек
const listForms = document.querySelector(".forms"); // список форм

const input = document.querySelector(".form__input");
const button = document.querySelector(".form__submit");
const templateItem = document.querySelector(".item_template").content; // html разметка карточки
const templateForm = document.querySelector(".popup_template").content; //html разметка форм
const profileOpenPopupEditButton = document.querySelector(
  ".profile-info__edit-button"
); // кнопка редактирования
const profileOpenPopupAddButton = document.querySelector(
  ".profile__add-button"
); // кнопка добавления

function render() {
  //функция перебирает значения карточек "из коробки"
  initialCards.forEach(renderItem);
}

function renderItem(item) {
  //ф. добавляет новую карточку со значениями "из коробки"
  const newItemFromBox = templateItem.cloneNode(true);
  newItemFromBox
    .querySelector(".element__image")
    .setAttribute("src", item.link); //присвоение атрибута
  newItemFromBox
    .querySelector(".element__image")
    .setAttribute("alt", "на фотографии " + item.name); // склеивает фразу "на фотографии + имя карточки"
  newItemFromBox.querySelector(".element__title").innerText = item.name; // замена текста
  addListeners(newItemFromBox); // добавляет слушателя новому элементу
  listCards.append(newItemFromBox); // добавляет новую карточку на первое место
}

render(); //вызов ф-ии

function renderForm() {
  //функция перебирает значения полей формы
  formAreas.forEach(makeForm);
}

function makeForm(item) {
  //ф. добавляет новую форму со значениями "из коробки"
  const newFormItem = templateForm.cloneNode(true);

  newFormItem.querySelector(".form").setAttribute("name", item.formName);
  newFormItem.querySelector(".popup").setAttribute("id", item.idn);
  newFormItem.querySelector(".popup__heading").innerText = item.title;
  newFormItem
    .querySelector(".form__input-area_fst")
    .setAttribute("name", item.nameFstLine); //присвоение атрибута
  newFormItem
    .querySelector(".form__input-area_fst")
    .setAttribute("id", item.idFstLine);
  newFormItem
    .querySelector(".form__input-area_fst")
    .setAttribute("placeholder", item.PlaceHoldFstLine);
  newFormItem
    .querySelector(".form__input-area_fst")
    .setAttribute("value", item.ValueFstLine);
  newFormItem
    .querySelector(".form__input-area_snd")
    .setAttribute("name", item.nameSndLine); //присвоение атрибута

  newFormItem
    .querySelector(".form__input-area_snd")
    .setAttribute("type", item.type);

  newFormItem
    .querySelector(".form__input-area_snd")
    .setAttribute("id", item.idSndLine);
  newFormItem
    .querySelector(".form__input-area_snd")
    .setAttribute("placeholder", item.PlaceHoldSndLine);
  newFormItem
    .querySelector(".form__input-area_snd")
    .setAttribute("value", item.ValueSndLine);
  newFormItem.querySelector(".form__button").innerText = item.label; // замена текста
  newFormItem.querySelector(".popup__close").setAttribute("id", item.labelId);
  listForms.appendChild(newFormItem);
}
renderForm();

const formElement = document.querySelector(".forms");
const popup = formElement.querySelectorAll(".popup");
const popupEdit = formElement.querySelector("#edit"); // форма edit
const popupAdd = formElement.querySelector("#add"); // форма add
const popupEditBlockCloseButton = formElement.querySelector(
  "#popupEditBlockCloseButton"
);
const popupAddBlockCloseButton = formElement.querySelector(
  "#popupAddBlockCloseButton"
);
const formEditElement = formElement.querySelector("#edit");
const formAddElement = formElement.querySelector("#add");

const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-self");
const profInfoName = document.querySelector(".profile-info__name");
const profInfoAboutSelf = document.querySelector(".profile-info__about-self");

let placeNameInput = document.querySelector("#place");
let placeLinkInput = document.querySelector("#placeLink");
let placeNameAdded = document.querySelector(".element__title");
let placeLinkAdded = document.querySelector(".element__image");

function openPopupEdit() {
  //открыть первую форму по клику на edit-buton
  popupEdit.classList.add("popup_opened");
  nameInput.value = profInfoName.textContent;
  jobInput.value = profInfoAboutSelf.textContent;
}

function openPopupAdd() {
  //открыть вторую форму по клику на add-buton
  popupAdd.classList.add("popup_opened");
}

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
    lastCardDelete();
  }

  closePopup();
}

function lastCardDelete() {
  const elements = document.querySelector(".elements");
  elements.removeChild(elements.children[5]);
}

function closePopup() {
  popupEdit.classList.remove("popup_opened");
  popupAdd.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profInfoName.textContent = nameInput.value;
  profInfoAboutSelf.textContent = jobInput.value;
  closePopup();
}

profileOpenPopupEditButton.addEventListener("click", openPopupEdit); // слушатель запускает ф-ию открыть первую форму по клику на edit-buton
profileOpenPopupAddButton.addEventListener("click", openPopupAdd); //слушатель запускает ф-ию открыть вторую форму по клику на add-buton

popupEditBlockCloseButton.addEventListener("click", closePopup); //слушатель запускает ф-ию закрыть  форму по клику на close-buton
popupAddBlockCloseButton.addEventListener("click", closePopup); //слушатель запускает ф-ию закрыть  форму по клику на close-buton

formEditElement.addEventListener("submit", formSubmitHandler);
formAddElement.addEventListener("submit", renderNewItem);

function addListeners(el) {
  el.querySelector(".element__basket").addEventListener("click", handleDelete);
  el.querySelector(".element__hart").addEventListener("click", handlelike);
}

function handleDelete(event) {
  event.target.closest(".element").remove();
}

function handlelike(event) {
  event.target.classList.toggle("element__hart_active")
}


