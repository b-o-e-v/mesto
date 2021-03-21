// ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
    //profile
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
    //cards
const cards = document.querySelector('.cards');
    //popup
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const profileEdit = document.querySelector('.profile__edit');
const profileAdd = document.querySelector('.profile__add');
const popupsClose = document.querySelectorAll('.popup__close');
const popupPhoto = document.querySelector('.popup_type_open-photo');
const popupImg = document.querySelector('.popup__img');
    //form
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const nameInput = document.querySelector('.popup__input_string_name');
const jobInput = document.querySelector('.popup__input_string_job');
const cardName = document.querySelector('.popup__input_string_card-name');
const cardLink = document.querySelector('.popup__input_string_card-link');

// ФУНКЦИИ
function openPopup(popup) {
    popup.classList.add('popup_opened');  
}

function openPropfilePopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(popupEdit);
    const errs = document.querySelectorAll('.popup__input-error');
    errs.forEach(function (err) {
        err.classList.remove('popup__input-error_visible'); 
    })
    const btnSave = formEdit.querySelector('.popup__save');
    btnSave.classList.remove('popup__save_disabled');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleProfileSubmit (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEdit);      
}

function createCard(item) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = item.link;
    cardElement.querySelector('.card__img').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;

    const likeButton = cardElement.querySelector('.card__like');
    likeButton.addEventListener('click', likeCard);
    const deleteDelete = cardElement.querySelector('.card__delete');
    deleteDelete.addEventListener('click', deleteCard); 
    const cardPhoto = cardElement.querySelector('.card__img');
    cardPhoto.addEventListener('click', openPhoto); 
    
    return cardElement;
} 

function likeCard(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('card__like_active');
}

function deleteCard(event) {
   event.target.parentElement.remove();
}

function openPhoto(event) {
   openPopup(popupPhoto);
   popupImg.src = event.target.src;
   popupImg.alt = event.target.alt;
   const popupName = document.querySelector('.popup__name');
   popupName.textContent = event.target.alt;
}

function addCard(cardElement) {
    cards.prepend(cardElement);
}

function handleCardSubmit (evt) {
    evt.preventDefault();
    const card = {
        name: cardName.value,
        link: cardLink.value
    };
    const element = createCard(card);
    addCard(element);
    closePopup(popupAdd);    
    formAdd.reset();
}

initialCards.forEach(function (item) {
    const element = createCard(item);
    addCard(element);
});


// СОБЫТИЯ
profileAdd.addEventListener('click', () => openPopup(popupAdd));
profileEdit.addEventListener('click', openPropfilePopup);
popupsClose.forEach(function(button) {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }    
    })
    popup.addEventListener('mousedown', function (evt) {
        if (evt.target === popup) {
            closePopup(popup);
        }
    });
}) 
formEdit.addEventListener('submit', handleProfileSubmit); 
formAdd.addEventListener('submit', handleCardSubmit);