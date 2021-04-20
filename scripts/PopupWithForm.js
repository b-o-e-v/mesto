import Popup from './Popup.js'
import * as constants from './constants.js'

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submit}) {
    super(popupSelector);
    this._allInputFields = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
    this._form = this._popupSelector.querySelector('.popup__form');
    this._handleSubmit = this._handleSubmit.bind(this);
    this._submit = submit;
  }

  _getInputValues() {
    const inputData = {};
    this._allInputFields.forEach((input) => {
      inputData[input.name] = input.value;
    })
    return inputData
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues())
  }

  setEventListeners() {
    super.open();
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit)
  }

  close() {
    super.close();
    constants.formAdd.reset();
  }
}