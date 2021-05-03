import { initialValidate } from "../utils/initial-validate.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { profileAdd, profileEdit, photoUpdate } from "../utils/constants.js";
import { group, token } from "../utils/user.js";
import "./index.css";
import "../index.html";

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/${group}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

const cardList = new Section(
  (card) => {
    cardList.setItem(generateCard(card));
  },
  ".cards",
  api,
  generateCard
);

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const user = new UserInfo(
  {
    nameSelector: ".profile__name",
    aboutSelector: ".profile__description",
    avatarSelector: ".profile__avatar",
  },
  api
);
user.setUserInfo();

// СОЗДАТЬ КЛАССЫ ПОПАПОВ
const popupImg = new PopupWithImage(".popup_type_open-photo");
const popupDelete = new PopupWithSubmit(".popup_type_delete");
const popupAdd = new PopupWithForm({
  popupSelector: ".popup_type_add",
  submit: (card) => {
    cardList.saveItem(card, popupAdd.close);
  },
});
const popupEdit = new PopupWithForm({
  popupSelector: ".popup_type_edit",
  submit: (InputValues) => {
    api
      .editUserDesc(InputValues)
      .then(() => {
        user
          .setUserDesc()
          .then(() => {
            popupEdit.close();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
const popupUpdate = new PopupWithForm({
  popupSelector: ".popup_type_update",
  submit: (InputValues) => {
    api
      .updatePhoto(InputValues)
      .then(() => {
        user
          .setUserAvatar()
          .then(() => {
            popupUpdate.close();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function generateCard(card) {
  const element = new Card(card, "#card", popupImg.open, popupDelete.open, api);
  return element.generateCard();
}

// ФУНКЦИЯ ВАЛИДАЦИИ ПОЛЕЙ ФОРМ
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector);
  validate.enableValidation();
  return validate;
}

// ДОБАВИТЬ МАССИВ КАРТОЧЕК НА СТРАНИЦУ
api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

// СЛУШАТЕЛИ
profileAdd.addEventListener("click", () => {
  enableValidation(".popup__form_type_add").resetValidation();
  popupAdd.setEventListeners();
});
profileEdit.addEventListener("click", () => {
  enableValidation(".popup__form_type_edit").resetValidation();
  user.getUserInfo();
  popupEdit.setEventListeners();
});
photoUpdate.addEventListener("click", () => {
  enableValidation(".popup__form_type_update").resetValidation();
  popupUpdate.setEventListeners();
});
