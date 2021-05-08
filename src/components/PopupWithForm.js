import Popup from "./Popup.js";
import { renderLoading } from "../utils/utils.js";
import { 
  popupInputSelector,
  popupFormSelector,
  popupSaveSelector
} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._allInputFields = Array.from(
      this._popupElement.querySelectorAll(popupInputSelector)
    );
    this._form = this._popupElement.querySelector(popupFormSelector);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this._submit = submit;
  }

  // Получить значения инпутов
  _getInputValues() {
    const inputData = {};
    this._allInputFields.forEach((input) => {
      inputData[input.name] = input.value;
    });
    return inputData;
  }

  // Отправить форму
  _handleSubmit(evt) {
    evt.preventDefault();
    this._form.querySelector(popupSaveSelector).textContent = "Сохранение...";
    this._submit(this._getInputValues()).then(() => {
      this.close();
    });
  }

  // Слушатель
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  // Закрыть попап
  close() {
    super.close();
    this._form.reset();
    renderLoading(this._form);
  }
}
