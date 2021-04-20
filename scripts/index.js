import { initialCards } from './initial-сards.js'
import { initialValidate } from './initial-validate.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js'
import * as constants from './constants.js'
import '../pages/index.css'

// Включить валидацию
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector);
  validate.enableValidation();
  return validate;
}

const profileValidator = enableValidation('.popup__form_type_edit');
const addCardValidator = enableValidation('.popup__form_type_add');

// Попапаы
const PopupImg = new PopupWithImage('.popup_type_open-photo')
const PopupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submit: (card) => {
    const element = new Card(card, '#card', PopupImg.open);
    const cardElement = element.generateCard();
    CardList.setItem(cardElement);
    PopupAdd.close();
  }
})
const PopupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submit: (profileData) => {
    User.setUserInfo(profileData);
    PopupEdit.close();
  }
})

// создать и добавить карточку
const CardList = new Section({
  data: initialCards,
  renderer: (card) => {
    const element = new Card(card, '#card', PopupImg.open);
    const cardElement = element.generateCard();
    CardList.setItem(cardElement);
  }
}, '.cards');

CardList.renderItems()

// Информация о пользователе
const User = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description'
})

// Слушатели
constants.profileAdd.addEventListener('click', () => {
  addCardValidator.resetValidation();
  PopupAdd.setEventListeners();
});
constants.profileEdit.addEventListener('click', () => {
  profileValidator.resetValidation();
  User.getUserInfo();
  PopupEdit.setEventListeners();
});