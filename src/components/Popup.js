import { 
  popupOpenedSelector,
  popupSelector,
  popupCloseSelector
} from "../utils/constants.js";

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  // Закрытие попапа Escape
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Открыть попап
  open() {
    this._popupElement.classList.add(popupOpenedSelector);
    document.addEventListener("keydown", this._handleEscClose);
  }

  // Закрыть попап
  close() {
    this._popupElement.classList.remove(popupOpenedSelector);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  // Слушатель
  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains(popupSelector) ||
        evt.target.classList.contains(popupCloseSelector)
      ) {
        this.close();
      }
    });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
