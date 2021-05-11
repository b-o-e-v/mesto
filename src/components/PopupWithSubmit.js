import Popup from "./Popup.js";
import { 
  popupSaveSelector
} from "../utils/constants.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.btn = this._popupElement.querySelector(popupSaveSelector);
  }

  // Установить внутренний метод
  setSubmitAction(action) {
    this._handleSubmitCallback = action;
  }

  // Слушатель
  setEventListeners() {
    super.setEventListeners();
    this.btn.addEventListener("click", () => {
      this._handleSubmitCallback();
    });
  }
}