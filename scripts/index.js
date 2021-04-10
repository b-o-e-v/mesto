import { initialCards } from './initial-сards.js'
import { initialValidate } from './initial-validate.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import * as Const from './Constants.js'

// Включить валидацию
function enableValidation(formSelector) {
  const validate = new FormValidator(initialValidate, formSelector);
  validate.enableValidation();
}

// Создать карточку
function createCard(data, cardSelector) {
  const element = new Card(data, cardSelector, handleCardClick);
  const cardElement = element.generateCard();
  return cardElement;
}
// Добавить карточку
function addCard(card) {
  Const.cards.prepend(createCard(card, '.card'));
}

// Добавить все карточки из массива на страницу
initialCards.forEach(function (card) {
  addCard(card);
});

// Открыть попап
export function openPopup(popup) {
  popup.classList.add('popup_opened');  
  document.addEventListener('keydown', closeByEscape);
  enableValidation('.popup__form_type_edit');
  enableValidation('.popup__form_type_add');
}

// Открыть попап редактирования профиля
function openPropfilePopup() {
  Const.nameInput.value = Const.profileName.textContent;
  Const.jobInput.value = Const.profileDescription.textContent;
  openPopup(Const.popupEdit);
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
  Const.popupImg.src = link;
  Const.popupImg.alt = name;
  Const.popupName.textContent = name;
  openPopup(Const.popupPhoto);
}

// Отправить форму добавления карточки
function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: Const.cardName.value,
    link: Const.cardLink.value
  };
  addCard(card);
  closePopup(Const.popupAdd);
  Const.formAdd.reset()
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