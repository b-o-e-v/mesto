import { initialValidate } from '../utils/initial-validate.js'
import Api from '../components/Api.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'
import UserInfo from '../components/UserInfo.js'
import {
  profileAdd,
  profileEdit
} from '../utils/constants.js'
import {
  group,
  token
} from '../utils/user.js'
import './index.css'
import '../index.html'

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/${group}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

// ДОБАВИТЬ МАССИВ КАРТОЧЕК НА СТРАНИЦУ
api.getInitialCards()
  .then((data) => {
    const cardList = new Section({
      data: data.reverse(),
      renderer: (card) => {
        cardList.setItem(generateCard(card))
      }
    }, '.cards')
    cardList.renderItems()
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ
function generateCard(card) {
  const element = new Card(card, '#card', popupImg.open, popupDelete.open, api)
  return element.generateCard()
}

// ФУНКЦИЯ ВАЛИДАЦИИ ПОЛЕЙ ФОРМ
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector)
  validate.enableValidation()
  return validate
}

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const user = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
}, api)
user.setUserInfo()

// СОЗДАТЬ КЛАССЫ ПОПАПОВ
const popupImg = new PopupWithImage('.popup_type_open-photo')
const popupDelete = new PopupWithSubmit('.popup_type_delete')
const popupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submit: (card) => {
    const cardList = new Section({}, '.cards', api, generateCard)
    cardList.saveItem(card)
  }
})
const popupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submit: (InputValues) => {
    api.editUserDesc(InputValues).then(() => user.setUserDesc())
  }
})

// СЛУШАТЕЛИ
profileAdd.addEventListener('click', () => {
  enableValidation('.popup__form_type_add').resetValidation()
  popupAdd.setEventListeners()
})
profileEdit.addEventListener('click', () => {
  enableValidation('.popup__form_type_edit').resetValidation()
  user.getUserInfo()
  popupEdit.setEventListeners()
})