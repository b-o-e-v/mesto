import Popup from './Popup.js'

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this.btn = this._popupSelector.querySelector('.popup__save')
  }

  open(deleteCard, id) {
    super.setEventListeners()
    super.open()
    this.btn.addEventListener('click', () => {
      deleteCard(id)
      super.close()
    })
  }
}