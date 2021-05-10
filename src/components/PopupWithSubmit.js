import Popup from "./Popup.js";
import { renderLoading } from "../utils/utils.js";
import { 
  popupSaveSelector
} from "../utils/constants.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.btn = this._popupElement.querySelector(popupSaveSelector);
  }

  // Слушатель
  setEventListeners(deleteCard, id, card) {
    super.setEventListeners();
    this.btn.addEventListener("click", () => {
      renderLoading(true, this.btn)
      deleteCard(id, card);
    });
  }
}
