import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.btn = this._popupElement.querySelector(".popup__save");
  }

  setEventListeners(deleteCard, id) {
    super.setEventListeners();
    this.btn.addEventListener("click", () => {
      deleteCard(id);
    });
  }
}
