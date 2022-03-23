export const listCards = document.querySelector(".elements"); // список карточек изнаяально пустой, наполняется изначально из массива

export const placeNameInput = document.querySelector("#place"); //первая полоса ввода формы Новое место(Add)
export const placeLinkInput = document.querySelector("#placeLink"); //вторая полоса ввода формы Новое место(Add)

export const nameInput = document.querySelector("#userName"); //первая полоса ввода форм(Edit)
export const jobInput = document.querySelector("#about-self"); //вторая полоса ввода форм(Edit)

export const profInfoName = document.querySelector(".profile-info__userName"); //
export const profInfoAboutSelf = document.querySelector(".profile-info__about-self"); //

export const profilePopup = document.querySelector(".popup_type_edit-profile"); // попап блока редактировать профиль
export const cardPopup = document.querySelector(".popup_type_cardPopup"); //попап блока добавить карточку

export const formEdit = document.querySelector(".form_type_edit-profile"); //кнопка сохранения формы редактировать профиль
export const formAdd = document.querySelector(".form_type_add-block"); //кнопка сохранения формы добавить карточку

export const btnOpenPopupEdit = document.querySelector(".profile-info__edit-button"); //кнопка открытия формы редактировать профиль
export const btnOpenPopupAdd = document.querySelector(".profile__add-button"); //кнопка открытия формы добавить карточку


export const posterTitle = document.querySelector(".poster__name");
export const posterImage = document.querySelector(".poster__image");
export const posterPopup = document.querySelector(".popup_type_poster");
export const popupCloseButtons = document.querySelectorAll(".popup__close");


export const enableValidation = {
  inputSelector: ".form__input-area",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input-area_error",
  errorClass: ".popup__error",
};


export const selectors = {

cardListSelector: '.elements',

}
