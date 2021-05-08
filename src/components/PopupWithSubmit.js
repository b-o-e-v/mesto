import Popup from "./Popup.js";
import { 
  popupSaveSelector
} from "../utils/constants.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.btn = this._popupElement.querySelector(popupSaveSelector);
  }

  // Слушатель
  setEventListeners(deleteCard, id) {
    super.setEventListeners();
    this.btn.addEventListener("click", () => {
      deleteCard(id);
    });
  }
}
