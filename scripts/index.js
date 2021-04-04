import { initialCards } from './initial-сards.js'
import { initialValidate } from './initial-validate.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import * as Const from './Constants.js'

// Включить валидацию
const validate = new FormValidator(initialValidate, '.popup__form');
validate.enableValidation();

// Добавить карточку
function addCard(card) {
  const element = new Card(card, '.card');
  const cardElement = element.generateCard();
  Const.cards.prepend(cardElement);
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
  Const.nameInput.value = Const.profileName.textContent;
  Const.jobInput.value = Const.profileDescription.textContent;
  openPopup(Const.popupEdit);
  const errs = document.querySelectorAll('.popup__input-error');
  errs.forEach(function (err) {
    err.classList.remove('popup__input-error_visible');
  })
  const btnSave = Const.formEdit.querySelector('.popup__save');
  btnSave.classList.remove('popup__save_disabled');
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

// Отправить форму добавления карточки
function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: Const.cardName.value,
    link: Const.cardLink.value
  };
  const btnSave = Const.formAdd.querySelector('.popup__save');
  btnSave.classList.add('popup__save_disabled');
  addCard(card);
  closePopup(Const.popupAdd);    
  Const.formAdd.reset();
}

// Отправить форму редактирования профиля
function handleProfileSubmit (evt) {
  evt.preventDefault();
  Const.profileName.textContent = Const.nameInput.value;
  Const.profileDescription.textContent = Const.jobInput.value;
  closePopup(Const.popupEdit);      
}

// Слушатели
Const.profileAdd.addEventListener('click', () => openPopup(Const.popupAdd));
Const.profileEdit.addEventListener('click', openPropfilePopup);
Const.closeButtons.forEach(function(button) {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', function closePopupOverlay(evt) {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
}) 
Const.formEdit.addEventListener('submit', handleProfileSubmit); 
Const.formAdd.addEventListener('submit', handleCardSubmit);