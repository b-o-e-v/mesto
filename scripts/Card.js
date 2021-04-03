import { openPopup } from './index.js'

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector(this._cardSelector).cloneNode(true);

    return cardElement;
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPhoto() {
    const popupPhoto = document.querySelector('.popup_type_open-photo');
    const popupImg = document.querySelector('.popup__img');
    const popupName = document.querySelector('.popup__name');
    openPopup(popupPhoto);
    popupImg.src = this._element.querySelector('.card__img').src;
    popupImg.alt = this._element.querySelector('.card__img').alt;
    popupName.textContent = this._element.querySelector('.card__img').alt;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like');
    likeButton.addEventListener('click', () => {
      this._likeCard();
    });
    const deleteDelete = this._element.querySelector('.card__delete');
    deleteDelete.addEventListener('click', () => {
      this._deleteCard();
    });
    const cardPhoto = this._element.querySelector('.card__img');
    cardPhoto.addEventListener('click', () => {
      this._openPhoto();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__img').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}