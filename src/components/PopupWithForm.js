import Popup from "./Popup.js";
import { renderLoading } from "../utils/utils.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._allInputFields = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
    this._form = this._popupElement.querySelector(".popup__form");
    this._handleSubmit = this._handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this._submit = submit;
  }

  _getInputValues() {
    const inputData = {};
    this._allInputFields.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._form.querySelector(".popup__save").textContent = "Сохранение...";
    this._submit(this._getInputValues()).then(() => {
      this.close();
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
    renderLoading(this._form);
  }
}
