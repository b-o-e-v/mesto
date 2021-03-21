function enableValidation(obj) {
  const inactiveButtonClass = obj.inactiveButtonClass;
  const inputErrorClass = obj.inputErrorClass;
  const errorClass = obj.errorClass;
  const formSelector = obj.formSelector;
  const inputSelector = obj.inputSelector;
  const submitButtonSelector = obj.submitButtonSelector;
  const formList = Array.from(document.querySelectorAll(formSelector)); 
    
  formList.forEach((form) => {
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);   

    setEventListeners(form, inputList, buttonElement, errorClass, inputErrorClass, inactiveButtonClass);
    form.addEventListener('submit', function () {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  }); 
};

function setEventListeners(form, inputList, buttonElement, errorClass, inputErrorClass, inactiveButtonClass) {
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', function () {
      checkInputValidity(form, inputEl, errorClass, inputErrorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

function checkInputValidity(form, inputEl, errorClass, inputErrorClass) {
  if (!inputEl.validity.valid) {
    showInputError(form, inputEl, inputEl.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(form, inputEl, errorClass, inputErrorClass);
  }
};

function showInputError(form, inputEl, errorMessage, errorClass, inputErrorClass) {
  const errorElement = form.querySelector(`.${inputEl.id}-error`);
  errorElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

function hideInputError(form, inputEl, errorClass, inputErrorClass) {
  const errorElement = form.querySelector(`.${inputEl.id}-error`);
  errorElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_visible'
});