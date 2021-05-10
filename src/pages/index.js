import { initialValidate } from "../utils/initial-validate.js";
import { renderLoading } from "../utils/utils.js";
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
  likeActiveSelector,
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

// Контейнер для карточек
const cardList = new Section((card, id) => {
  cardList.setItem(generateCard(card, id));
}, containerSelector);

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
    // Запрашиваем карточки с сервера
    api
      .getInitialCards()
      .then((data) => {
        cardList.renderItems(data.reverse(), id);
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

// Создаем класс попапа добавления карточки
const popupAddCard = new PopupWithForm(popupAddCardSelector, (card) => {
  api
    .addCard(card)
    .then((card) => {
      cardList.setItem(generateCard(card));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAddCard.btnSave);
    })
});
popupAddCard.setEventListeners();

// Создаем класс попапа удаления карточки
const popupDelete = new PopupWithSubmit(popupDeleteSelector);

// Создаем класс попапа редактирования профиля
const popupEditProfile = new PopupWithForm(
  popupEditProfileSelector,
  (inputValues) => {
    api
      .editUserDesc(inputValues)
      .then(() => {
        user.setUserInfo(inputValues);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupEditProfile.btnSave);
      })
  }
);
popupEditProfile.setEventListeners();

// Создаем класс попапа редактирования аватара
const popupEditAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  (inputValues) => {
    api
      .updatePhoto(inputValues)
      .then(() => {
        user.setUserInfo(inputValues);
        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false, popupEditAvatar.btnSave);
      })
  }
);
popupEditAvatar.setEventListeners();

// Хэндлер постановки лайка
function heandlerPutLike(id, like, likeCount) {
  api.putLike(id)
    .then((res) => {
      like.classList.add(likeActiveSelector);
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
// Хэндлер удаления лайка
function heandlerRemoveLike(id, like, likeCount) {
  api.removeLike(id)
    .then((res) => {
      like.classList.remove(likeActiveSelector);
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}
// Хэндлер удаления карточки
function heandlerDeleteCard(id, card) {
  api.deleteCard(id)
    .then(() => {
      card.remove();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupDelete.btn);
    })
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
addCardFormValidator.enableValidation();
// Включаем валидацию в форме редактирования профиля
const editProfileFormValidator = new FormValidator(initialValidate, editProfileFormSelector);
editProfileFormValidator.enableValidation();
// Включаем валидацию в форме редактирования аватара
const editAvatarFormValidator = new FormValidator(initialValidate, editAvatarFormSelector);
editAvatarFormValidator.enableValidation();

// Слушатель редактирования профиля
profileEdit.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  const userData = user.getUserInfo();
  user.setInputFormValues(userData);
  popupEditProfile.open();
});

// Слушатель добавления карточки
profileAdd.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  popupAddCard.open();
});

// Слушатель редактирования аватара
photoUpdate.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();
  popupEditAvatar.open();
});
