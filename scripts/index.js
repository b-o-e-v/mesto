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
let saveEdit = document.querySelector('.popup__save_type_edit');
let saveAdd = document.querySelector('.popup__save_type_add');
let popupPhoto = document.querySelector('.popup_type_open-photo');
let popupImg = document.querySelector('.popup__img');
    //form
let formEdit = document.querySelector('.popup__form_type_edit');
let formAdd = document.querySelector('.popup__form_type_add');
let nameInput = document.querySelector('.popup__input_string_name');
let jobInput = document.querySelector('.popup__input_string_job');
let cardName = document.querySelector('.popup__input_string_card-name');
let cardLink = document.querySelector('.popup__input_string_card-link');

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
    popup[0].classList.remove('popup_opened');
    popup[1].classList.remove('popup_opened');
    popup[2].classList.remove('popup_opened');
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

    const button = cardElement.querySelector('.card__like');
    button.addEventListener('click', function (event) {
        const eventTarget = event.target;
        eventTarget.classList.toggle('card__like_active');
    }); 

    const deleteCard = cardElement.querySelector('.card__delete');
    deleteCard.addEventListener('click', function (event) {
        event.target.parentElement.remove();
        let src = event.target.nextElementSibling.src;
        let searchName = src.substring(src.length - 10, src.length);
        let index = initialCards.findIndex(el => el.link.substring(el.link.length - 10, el.link.length) === searchName);
        initialCards.splice(index, 1);
    }); 

    const cardPhoto = cardElement.querySelector('.card__img');
    cardPhoto.addEventListener('click', function (event) {
        addOpened(popupPhoto);
        popupImg.src = event.target.src;
        popupImg.alt = event.target.alt;
        let popupName = document.querySelector('.popup__name');
        popupName.textContent = event.target.alt;
    })
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
popupClose[2].addEventListener('click', closePopup);
formEdit.addEventListener('submit', formSubmitHandler); 
formAdd.addEventListener('submit', formSubmitHandlerAdd);