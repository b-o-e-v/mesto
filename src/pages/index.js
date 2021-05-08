import { initialValidate } from "../utils/initial-validate.js";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { 
  profileAdd, 
  profileEdit, 
  photoUpdate, 
  nameSelector, 
  aboutSelector,
  avatarSelector,
  containerSelector,
  popupImgOpenSelector,
  popupDeleteSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupAddCardSelector,
  templateSelector,
  addCardFormSelector,
  editProfileFormSelector,
  editAvatarFormSelector
} from "../utils/constants.js";
import { group, token } from "../utils/user.js";
import "./index.css";
import "../index.html";

// Апи
const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/${group}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

// Создаем класс информации о пользователе
const user = new UserInfo({ nameSelector, aboutSelector, avatarSelector });
// Запрашиваем информацию о пользователе с сервера
api
  .getUserInfo()
  .then((res) => {
    user.setUserInfo(res);
    return res._id;
  })
  .then((id) => {
    const cardList = new Section((card) => {
      cardList.setItem(generateCard(card, id));
    }, containerSelector);

    // Запрашиваем карточки с сервера
    api
      .getInitialCards()
      .then((data) => {
        cardList.renderItems(data.reverse());
      })
      .then(() => {
        // После того, как все карточки появились, создаем класс для новых
        const popupAddCard = new PopupWithForm(popupAddCardSelector, (card) => {
          return api.addCard(card).then((card) => {
            cardList.setItem(generateCard(card, id));
          });
        });
        popupAddCard.setEventListeners();

        // Слушатель добавления карточки
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

// Создаем класс попапа с картинкой
const popupImg = new PopupWithImage(popupImgOpenSelector);
popupImg.setEventListeners();

// Создаем класс попапа удаления карточки
const popupDelete = new PopupWithSubmit(popupDeleteSelector);

// Создаем класс попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
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

// Создаем класс попапа редактирования аватара
const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
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

// Хэндлер постановки лайка
function heandlerPutLike(id) {
  return api.putLike(id).catch((err) => {
    console.log(err);
  });
}
// Хэндлер удаления лайка
function heandlerRemoveLike(id) {
  return api.removeLike(id).catch((err) => {
    console.log(err);
  });
}
// Хэндлер удаления карточки
function heandlerDeleteCard(id) {
  return api.deleteCard(id).catch((err) => {
    console.log(err);
  });
}

// Функция создания карточки
function generateCard(card, id) {
  const element = new Card(
    card,
    templateSelector,
    popupImg.open,
    popupDelete,
    heandlerPutLike,
    heandlerRemoveLike,
    heandlerDeleteCard,
    id
  );
  return element.generateCard();
}

// Включаем валидацию в форме добавления карточки
const addCardFormValidator = new FormValidator(initialValidate, addCardFormSelector);
// Включаем валидацию в форме редактирования профиля
const editProfileFormValidator = new FormValidator(initialValidate, editProfileFormSelector);
// Включаем валидацию в форме редактирования аватара
const editAvatarFormValidator = new FormValidator(initialValidate, editAvatarFormSelector);

// Слушатель редактирования профиля
profileEdit.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  editProfileFormValidator.enableValidation();
  const userData = user.getUserInfo();
  user.setInputFormValues(userData);
  popupEditProfile.open();
});

// Слушатель редактирования аватара
photoUpdate.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();
  editAvatarFormValidator.enableValidation();
  popupEditAvatar.open();
});
