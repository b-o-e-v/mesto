function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));  
    
  formList.forEach((form) => {
    setEventListeners(form);
  }); 
};

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__save');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputEl) => {
    inputEl.addEventListener('input', function () {
      checkInputValidity(form, inputEl);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function checkInputValidity(form, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(form, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(form, inputEl);
  }
};

function showInputError(form, inputEl, errorMessage) {
  const errorElement = form.querySelector(`.${inputEl.id}-error`);
  errorElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_visible');
};

function hideInputError(form, inputEl) {
  const errorElement = form.querySelector(`.${inputEl.id}-error`);
  errorElement.classList.remove('popup__input-error');
  errorElement.classList.remove('popup__input-error_visible');
  errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add('popup__save_disabled');
  } else {
    buttonElement.classList.remove('popup__save_disabled');
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

enableValidation();