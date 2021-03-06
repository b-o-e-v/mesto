const initialCards = [
    {
      name: 'Россия',
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
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
    //cards
const cards = document.querySelector('.cards');
    //popup
let popup = document.querySelectorAll('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let profileEdit = document.querySelector('.profile__edit');
let profileAdd = document.querySelector('.profile__add');
let popupClose = document.querySelectorAll('.popup__close');
let saveEdit = document.querySelector('.popup__save_type_edit')
let saveAdd = document.querySelector('.popup__save_type_add')
    //form
let formEdit = document.querySelector('.popup__form_type_edit');
let formAdd = document.querySelector('.popup__form_type_add');
let nameInput = document.querySelector('.popup__input_string_name');
let jobInput = document.querySelector('.popup__input_string_job');
let cardName = document.querySelector('.popup__input_string_card-name');
let cardLink = document.querySelector('.popup__input_string_card-link');

// ФУНКЦИИ
function openPopup(evt) {
    if (evt.target == profileEdit) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileDescription.textContent;
        popupEdit.classList.add('popup_opened');    
    } else if (evt.target == profileAdd) {
        popupAdd.classList.add('popup_opened');    
    }
}

function closePopup() {
    popup[0].classList.remove('popup_opened');
    popup[1].classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();      
}

function addCard(item) {
    let cardTemplate = document.querySelector('#card').content;
    let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__img').src = item.link;
    cardElement.querySelector('.card__img').alt = item.name;
    cardElement.querySelector('.card__title').textContent = item.name;
    cards.prepend(cardElement);
}

function formSubmitHandlerAdd (evt) {
    evt.preventDefault();
    let card = {
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
popupClose[0].addEventListener('click', closePopup);
popupClose[1].addEventListener('click', closePopup);
formEdit.addEventListener('submit', formSubmitHandler); 
formAdd.addEventListener('submit', formSubmitHandlerAdd); 


