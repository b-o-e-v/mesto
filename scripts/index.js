import { initialCards } from './initial-сards.js'
import { initialValidate } from './initial-validate.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import * as constants from './constants.js'

// Включить валидацию
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector);
  validate.enableValidation();
  return validate;
}

const profileValidator = enableValidation('.popup__form_type_edit');
const addCardValidator = enableValidation('.popup__form_type_add');

// Создать карточку
function createCard(data, cardSelector) {
  const element = new Card(data, cardSelector, handleCardClick);
  const cardElement = element.generateCard();
  return cardElement;
}
// Добавить карточку
function addCard(card) {
  constants.cards.prepend(createCard(card, '#card'));
}

// Добавить все карточки из массива на страницу
initialCards.forEach(function (card) {
  addCard(card);
});

// Открыть попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');  
  document.addEventListener('keydown', closeByEscape);
}

// Открыть попап редактирования профиля
function openPropfilePopup() {
  profileValidator.resetValidation();
  constants.nameInput.value = constants.profileName.textContent;
  constants.jobInput.value = constants.profileDescription.textContent;
  openPopup(constants.popupEdit);
}

// Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Закрыть попап кнопкой Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Открыть попап с изображением
function handleCardClick(name, link) {
  constants.popupImg.src = link;
  constants.popupImg.alt = name;
  constants.popupName.textContent = name;
  openPopup(constants.popupPhoto);
}

// Отправить форму добавления карточки
function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: constants.cardName.value,
    link: constants.cardLink.value
  };
  addCard(card);
  closePopup(constants.popupAdd);
  constants.formAdd.reset();
}

// Отправить форму редактирования профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();
  constants.profileName.textContent = constants.nameInput.value;
  constants.profileDescription.textContent = constants.jobInput.value;
  closePopup(constants.popupEdit);
}

// Слушатели
constants.profileAdd.addEventListener('click', () => {
  addCardValidator.resetValidation();
  openPopup(constants.popupAdd);
});
constants.profileEdit.addEventListener('click', openPropfilePopup);
constants.closeButtons.forEach(function(button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', function closePopupOverlay(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}) 
constants.formEdit.addEventListener('submit', handleProfileSubmit); 
constants.formAdd.addEventListener('submit', handleCardSubmit);