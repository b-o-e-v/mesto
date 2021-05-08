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

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const user = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});
api
  .getUserInfo()
  .then((res) => {
    user.setUserInfo(res);
    return res._id;
  })
  .then((id) => {
    const cardList = new Section((card) => {
      cardList.setItem(generateCard(card, id));
    }, ".cards");

    // ДОБАВИТЬ МАССИВ КАРТОЧЕК НА СТРАНИЦУ
    api
      .getInitialCards()
      .then((data) => {
        cardList.renderItems(data.reverse());
      })
      .then(() => {
        const popupAddCard = new PopupWithForm(".popup_type_add", (card) => {
          return api.addCard(card).then((card) => {
            cardList.setItem(generateCard(card, id));
          });
        });
        popupAddCard.setEventListeners();
        profileAdd.addEventListener("click", () => {
          addCardFormValidator.resetValidation();
          addCardFormValidator.enableValidation();
          popupAddCard.open();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

// СОЗДАТЬ КЛАССЫ ПОПАПОВ
const popupImg = new PopupWithImage(".popup_type_open-photo");
popupImg.setEventListeners();
const popupDelete = new PopupWithSubmit(".popup_type_delete");
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit",
  (inputValues) => {
    return api
      .editUserDesc(inputValues)
      .then(() => {
        user.setUserInfo(inputValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupEditProfile.setEventListeners();
const popupEditAvatar = new PopupWithForm(
  ".popup_type_update",
  (inputValues) => {
    return api
      .updatePhoto(inputValues)
      .then(() => {
        user.setUserInfo(inputValues);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupEditAvatar.setEventListeners();

function heandlerPutLike(id) {
  return api.putLike(id).catch((err) => {
    console.log(err);
  });
}

function heandlerRemoveLike(id) {
  return api.removeLike(id).catch((err) => {
    console.log(err);
  });
}

function heandlerDeleteCard(id) {
  return api.deleteCard(id).catch((err) => {
    console.log(err);
  });
}

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function generateCard(card, id) {
  const element = new Card(
    card,
    "#card",
    popupImg.open,
    popupDelete,
    heandlerPutLike,
    heandlerRemoveLike,
    heandlerDeleteCard,
    id
  );
  return element.generateCard();
}

const addCardFormValidator = new FormValidator(
  initialValidate,
  ".popup__form_type_add"
);
const editProfileFormValidator = new FormValidator(
  initialValidate,
  ".popup__form_type_edit"
);
const editAvatarFormValidator = new FormValidator(
  initialValidate,
  ".popup__form_type_update"
);

// СЛУШАТЕЛИ
profileEdit.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  editProfileFormValidator.enableValidation();
  const userData = user.getUserInfo();
  user.setInputFormValues(userData);
  popupEditProfile.open();
});
photoUpdate.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();
  editAvatarFormValidator.enableValidation();
  popupEditAvatar.open();
});
