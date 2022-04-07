import "./index.css";

import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { api } from "../scripts/components/Api.js";
import {
  nameInput,
  jobInput,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  config,
  selectors,
  //  userId
} from "../scripts/utils/constants.js";

let userId;

api.getProfile().then((res) => {
  userInfo.setUserInfo(res.name, res.about);
  userId = res._id;
});

api.getInitialCards().then((cardList) => {
  cardList.forEach((data) => {
    data.userId = userId;
    defaultCardList.addItem(data);
  });
});

const defaultCardList = new Section(
  { items: [], renderer: createCard },
  selectors.cardListSelector
);
const popupPoster = new PopupWithImage(".popup_type_poster");
const popupEditProfileForm = new PopupWithForm(
  ".popup_type_edit-profile",
  handleProfileFormSubmit
);
const popupAddCardForm = new PopupWithForm(
  ".popup_type_cardPopup",
  handleAddFormSubmit
);
const popupSafetyIssue = new PopupWithForm(".popup_type_safety-issue");
const userInfo = new UserInfo(selectors);

popupPoster.setEventListeners();
popupEditProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupSafetyIssue.setEventListeners();

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

function createCard(data) {
  const card = new Card(
    data,
    ".card-template_type_default",
    handleCardClick,
    (id) => {
      popupSafetyIssue.open();
      popupSafetyIssue.changeSubmitHandler(() => {
        api
          .deleteCard(id)

          .then(() => {
            card.deleteCard();
            popupSafetyIssue.close();
          });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deletelikeCard(id).then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addlikeCard(id).then((res) => {
          card.setLikes(res.likes);
        });
      }
    }
  );

  return card.generateCard();
}

function handleCardClick(data) {
  popupPoster.open(data);
}

// function handledeleteCard(id) {
//   popupSafetyIssue.open();
//   popupSafetyIssue.changeSubmitHandler(() => {
//     api.deleteCard(id)

//     .then((card) => {

//   card.deleteCard();
//       popupSafetyIssue.close();
//   })

//   });
// }

btnOpenPopupEdit.addEventListener("click", () => {
  const { userName, aboutSelf } = userInfo.getUserInfo();
  nameInput.value = userName;
  jobInput.value = aboutSelf;
  formValidators["editProfileForm"].resetErrorMessage();
  popupEditProfileForm.open();
});

btnOpenPopupAdd.addEventListener("click", () => {
  formValidators["addCardForm"].resetErrorMessage();
  popupAddCardForm.open();
});

function handleProfileFormSubmit({ userName, aboutSelf }) {
  api.editProfile(userName, aboutSelf).then(() => {
    userInfo.setUserInfo(userName, aboutSelf);
    popupEditProfileForm.close();
  });
}

function handleAddFormSubmit(values) {
  api.addCard(values["place"], values["placeLink"]).then((res) => {
    defaultCardList.addItem(res);
    popupAddCardForm.close();
  });
}

defaultCardList.renderItems();
enableValidation(config);
