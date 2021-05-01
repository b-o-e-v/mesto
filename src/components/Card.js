export default class Card {
  constructor(data, cardSelector, openImg, openSubmit, api) {
    this._name = data.name
    this._link = data.link
    this._author = data.owner._id
    this._id = data._id
    this._like = data.likes.length
    this._cardSelector = cardSelector
    this._openImg = openImg
    this._openSubmit = openSubmit
    this._deleteCard = this._deleteCard.bind(this)
    this._api = api
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true)

    return cardElement
  }

  _likeCard() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active')
  }

  _deleteCard(cardId) {
    this._api.deleteCard(cardId)
    this._element.remove()
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.card__like')
    likeButton.addEventListener('click', () => {
      this._likeCard()
    })

    const deleteDelete = this._element.querySelector('.card__delete')   
    this._api.getUserInfo().then((res) => {
      if (res._id === this._author) {
        deleteDelete.classList.add('show-block')
      }
    })
 
    deleteDelete.addEventListener('click', () => {
      this._openSubmit(this._deleteCard, this._cardPhoto.id)
    })
    this._cardPhoto.addEventListener('click', () => {
      this._openImg(this._name, this._link)
    })
  }

  generateCard() {
    this._element = this._getTemplate()
    this._cardPhoto = this._element.querySelector('.card__img')
    this._setEventListeners()

    this._cardPhoto.src = this._link
    this._cardPhoto.alt = this._name
    this._cardPhoto.id = this._id
    this._element.querySelector('.card__title').textContent = this._name
    this._element.querySelector('.card__like-count').textContent = this._like

    return this._element
  }
}