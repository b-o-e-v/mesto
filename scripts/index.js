import { initialCards } from './initial-сards.js'
import Card from './Card.js'
import * as Const from './Constants.js';

export function openPopup(popup) {
  popup.classList.add('popup_opened');  
  document.addEventListener('keydown', closeByEscape);
}

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

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function handleProfileSubmit (evt) {
  evt.preventDefault();
  Const.profileName.textContent = Const.nameInput.value;
  Const.profileDescription.textContent = Const.jobInput.value;
  closePopup(Const.popupEdit);      
}

function addCard(card) {
  const element = new Card(card, '.card');
  const cardElement = element.generateCard();
  Const.cards.prepend(cardElement);
}

function handleCardSubmit (evt) {
  evt.preventDefault();
  const card = {
    name: Const.cardName.value,
    link: Const.cardLink.value
  };
  addCard(card);
  closePopup(Const.popupAdd);    
  Const.formAdd.reset();
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }}

initialCards.forEach(function (card) {
  addCard(card);
});

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