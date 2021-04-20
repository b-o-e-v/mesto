import Popup from './Popup.js'
import * as constants from './constants.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    constants.popupImg.src = link;
    constants.popupImg.alt = name;
    constants.popupName.textContent = name;
    super.setEventListeners()
    super.open();
  }
}