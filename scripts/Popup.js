export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');  
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    }
  }

  setEventListeners() {
    const button = this._popupSelector.querySelector('.popup__close');
    button.addEventListener('click', () => {
      this.close()
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });   
  }
}