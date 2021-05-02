import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submit}) {
    super(popupSelector)
    this._allInputFields = Array.from(this._popupSelector.querySelectorAll('.popup__input'))
    this._form = this._popupSelector.querySelector('.popup__form')
    this._handleSubmit = this._handleSubmit.bind(this)
    this.close = this.close.bind(this)
    this._submit = submit
  }

  _getInputValues() {
    const inputData = {}
    this._allInputFields.forEach((input) => {
      inputData[input.name] = input.value
    })
    return inputData
  }

  _handleSubmit(evt) {
    evt.preventDefault()
    this._form.querySelector('.popup__save').textContent = 'Сохранение...'
    this._submit(this._getInputValues())
  }

  setEventListeners() {
    super.open()
    super.setEventListeners()
    this._form.addEventListener('submit', this._handleSubmit)
  }

  close() {
    super.close()
    this._form.reset()
    if(this._form.classList.contains('popup__form_type_add')) {
      this._form.querySelector('.popup__save').textContent = 'Создать'
    } else {
      this._form.querySelector('.popup__save').textContent = 'Сохранить'
    }
  }
}