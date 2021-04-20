import { initialCards } from '../utils/initial-сards.js'
import { initialValidate } from '../utils/initial-validate.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import {
  profileAdd,
  profileEdit
} from '../utils/constants.js'
import './index.css'

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ
const User = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description'
})

// СОЗДАТЬ КЛАССЫ ПОПАПОВ
const PopupImg = new PopupWithImage('.popup_type_open-photo')
const PopupAdd = new PopupWithForm({
  popupSelector: '.popup_type_add',
  submit: (card) => {
    const element = new Card(card, '#card', PopupImg.open)
    const cardElement = element.generateCard()
    CardList.setItem(cardElement)
    PopupAdd.close()
  }
})
const PopupEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  submit: (profileData) => {
    User.setUserInfo(profileData)
    PopupEdit.close()
  }
})

// ДОБАВИТЬ МАССИВ КАРТОЧЕК НА СТРАНИЦУ
const CardList = new Section({
  data: initialCards,
  renderer: (card) => {
    const element = new Card(card, '#card', PopupImg.open)
    const cardElement = element.generateCard()
    CardList.setItem(cardElement)
  }
}, '.cards')
CardList.renderItems()

// ВАЛИДАЦИЯ ПОЛЕЙ ФОРМ
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector)
  validate.enableValidation()
  return validate
}
const profileValidator = enableValidation('.popup__form_type_edit')
const addCardValidator = enableValidation('.popup__form_type_add')

// СЛУШАТЕЛИ
profileAdd.addEventListener('click', () => {
  addCardValidator.resetValidation()
  PopupAdd.setEventListeners()
})
profileEdit.addEventListener('click', () => {
  profileValidator.resetValidation()
  User.getUserInfo()
  PopupEdit.setEventListeners()
})