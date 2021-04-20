export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._cardSelector = cardSelector
    this._handleCardClick = handleCardClick
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)

    return cardElement
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _deleteCard() {
    this._element.remove()
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like')
    likeButton.addEventListener('click', () => {
      this._likeCard()
    })
    const deleteDelete = this._element.querySelector('.card__delete')
    deleteDelete.addEventListener('click', () => {
      this._deleteCard()
    })
    this._cardPhoto.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardPhoto = this._element.querySelector('.card__img')
    this._setEventListeners()

    this._cardPhoto.src = this._link
    this._cardPhoto.alt = this._name
    this._element.querySelector('.card__title').textContent = this._name

    return this._element
  }
}