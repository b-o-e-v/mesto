const initialCards = [
    {
      name: 'Российская Федерация',
      link: './images/Russia.jpg'
    },
    {
      name: 'Норвегия',
      link: './images/Norway.jpg'
    },
    {
      name: 'США',
      link: './images/USA.jpg'
    },
    {
      name: 'Италия',
      link: './images/Italy.jpg'
    },
    {
      name: 'Швейцария',
      link: './images/Switzerland.jpg'
    },
    {
      name: 'Япония',
      link: './images/Japan.jpg'
    },
]; 

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
function addOpened(popup) {
    popup.classList.add('popup_opened');  
}

function openPopup(evt) {
    if (evt.target == profileEdit) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;
        addOpened(popupEdit);
    } else if (evt.target == profileAdd) {
        addOpened(popupAdd);
    }
}

function closePopup() {
    popups.forEach(function(popup) {
        popup.classList.remove('popup_opened');
    })
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();      
}

function addCard(item) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = item.link;
    cardElement.querySelector('.card__img').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cards.prepend(cardElement);

    const button = cardElement.querySelector('.card__like');
    button.addEventListener('click', function (event) {
        const eventTarget = event.target;
        eventTarget.classList.toggle('card__like_active');
    }); 

    const deleteCard = cardElement.querySelector('.card__delete');
    deleteCard.addEventListener('click', function (event) {
        event.target.parentElement.remove();
        const src = event.target.nextElementSibling.src;
        const searchName = src.substring(src.length - 10, src.length);
        const index = initialCards.findIndex(el => el.link.substring(el.link.length - 10, el.link.length) === searchName);
        initialCards.splice(index, 1);
    }); 

    const cardPhoto = cardElement.querySelector('.card__img');
    cardPhoto.addEventListener('click', function (event) {
        addOpened(popupPhoto);
        popupImg.src = event.target.src;
        popupImg.alt = event.target.alt;
        const popupName = document.querySelector('.popup__name');
        popupName.textContent = event.target.alt;
    })
}

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    const card = {
        name: cardName.value,
        link: cardLink.value
    };
    initialCards.push(card);
    addCard(initialCards[initialCards.length - 1]);
    closePopup();    
    cardName.value = '';
    cardLink.value = '';
}

initialCards.forEach(function (item) {
    addCard(item)
});


// СОБЫТИЯ
profileEdit.addEventListener('click', openPopup);
profileAdd.addEventListener('click', openPopup);
popupsClose.forEach(function(popup) {
    popup.addEventListener('click', closePopup);
})
formEdit.addEventListener('submit', formSubmitHandler); 
formAdd.addEventListener('submit', formSubmitHandlerAdd);