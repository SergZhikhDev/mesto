import "./index.css";

import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import { api } from "../scripts/components/Api.js";
import {
  avatarInput,
  nameInput,
  jobInput,
  btnOpenPopupAvatar,
  btnOpenPopupEdit,
  btnOpenPopupAdd,
  config,
  selectors,
  avatarImg,
} from "../scripts/utils/constants.js";

const defaultCardList = new Section(
  { items: [], renderer: createCard },
  selectors.cardListSelector
);

const popupAvatarUpdate = new PopupWithForm(
  ".popup_type_avatar-update",
  handleAvatarUpdateFormSubmit
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

let userId;

api.getProfile()
.then((res) => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  userId = res._id;
  avatarImg.src = res.avatar;
})    .catch((err) => {
  console.log(`Ошибка: ${err}`);
})
.finally(() => {

});



api.getInitialCards()
.then((cardList) => {
  cardList.forEach((data) => {
    data.userId = userId;
    defaultCardList.addItem(data);
  });
   })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {


});

popupAvatarUpdate.setEventListeners();
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
        api.deleteCard(id)

          .then(() => {
            card.deleteCard();
            popupSafetyIssue.close();
          });
      });
    },


    (id) => {
      if (card.isLiked()) {
        api.deletelikeCard(id)
        .then((res) => {
          card.setLikes(res.likes);
        });
      } else {
        api.addlikeCard(id)
        .then((res) => {
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

btnOpenPopupAvatar.addEventListener("click", () => {
  formValidators["avatarUpdateForm"].resetErrorMessage();
  const { avatar } = userInfo.getUserInfo();
  avatarInput.value = avatar;
  popupAvatarUpdate.open();
});

function handleAvatarUpdateFormSubmit({ avatar }) {

  popupAvatarUpdate.renderLoading(true);

  api
    .avatarUpdate(avatar)
    .then((res) => {

      userInfo.setAvatar(avatar);
      popupAvatarUpdate.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAvatarUpdate.renderLoading(false);
    });
}

function handleProfileFormSubmit({ userName, aboutSelf }) {

  popupEditProfileForm.renderLoading(true);

  api
    .editProfile(userName, aboutSelf)
    .then(() => {
      userInfo.setUserInfo(userName, aboutSelf);
      popupEditProfileForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfileForm.renderLoading(false);
    });
}

function handleAddFormSubmit(values) {

  popupAddCardForm.renderLoading(true);

  api
    .addCard(values["place"], values["placeLink"])
    .then((res) => {
      defaultCardList.addItem(res);
      popupAddCardForm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddCardForm.renderLoading(false);
    });
}


defaultCardList.renderItems();
enableValidation(config);

