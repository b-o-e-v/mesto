import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    this._popupElement.querySelector(".popup__img").src = link;
    this._popupElement.querySelector(".popup__img").alt = name;
    this._popupElement.querySelector(".popup__name").textContent = name;
    super.open();
  }
}
