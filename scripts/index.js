// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
    //profile
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
    //popup
let popup = document.querySelector('.popup');
let profileEdit = document.querySelector('.profile__edit');
let popupClose = document.querySelector('.popup__close');
    //form
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

// ФУНКЦИИ
function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// ВЫЗОВ ФУНКЦИЙ
profileEdit.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 

// ПРОЧЕЕ
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;
