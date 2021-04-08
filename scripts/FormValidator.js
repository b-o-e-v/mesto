export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formSelector = formSelector;
  }

  _toggleButtonState(inputList, buttonElement) {
    if(this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _showInputError(form, inputEl, errorMessage) {
    const errorElement = form.querySelector(`.${inputEl.id}-error`);
    errorElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(form, inputEl) {
    const errorElement = form.querySelector(`.${inputEl.id}-error`);
    errorElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(form, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(form, inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(form, inputEl);
    }
  };

  _setEventListeners(form, inputList, buttonElement) {
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputEl) => {
      inputEl.addEventListener('input', () => {
        this._checkInputValidity(form, inputEl);
        this._toggleButtonState(inputList, buttonElement);
      });
      form.nextElementSibling.addEventListener('click', () => {
        this._hideInputError(form, inputEl);
      });
    });
    form.querySelector(this._submitButtonSelector).addEventListener('click', (e) => {
      e.target.classList.add(this._inactiveButtonClass);
    });
  };

  enableValidation() {
    const form = document.querySelector(this._formSelector);
    const inputList = Array.from(form.querySelectorAll(this._inputSelector));
    const buttonElement = form.querySelector(this._submitButtonSelector);

    this._setEventListeners(form, inputList, buttonElement);
  };
}