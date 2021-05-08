import { 
  cardSelector,
  likeActiveSelector,
  likeCountSelector,
  cardLikeSelector,
  cardDeleteSelector,
  showBlockSelector,
  cardImgSelector,
  cardTitleSelector
} from "../utils/constants.js";

export default class Card {
  constructor(
    data,
    cardSelector,
    openImg,
    popupDelete,
    heandlerPutLike,
    heandlerRemoveLike,
    heandlerDeleteCard,
    id
  ) {
    this._name = data.name;
    this._link = data.link;
    this._author = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._openImg = openImg;
    this._popupDelete = popupDelete;
    this._deleteCard = this._deleteCard.bind(this);
    this._heandlerPutLike = heandlerPutLike;
    this._heandlerRemoveLike = heandlerRemoveLike;
    this._heandlerDeleteCard = heandlerDeleteCard;
    this._userId = id;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);

    return cardElement;
  }

  _putLike() {
    this._heandlerPutLike(this._cardId)
      .then((res) => {
        console.log("Лайк поставлен");
        this._like.classList.add(likeActiveSelector);
        this._element.querySelector(likeCountSelector).textContent =
          res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _removeLike() {
    this._heandlerRemoveLike(this._cardId)
      .then((res) => {
        console.log("Лайк удален");
        this._like.classList.remove(likeActiveSelector);
        this._element.querySelector(likeCountSelector).textContent =
          res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _likeCard() {
    if (this._like.classList.contains(likeActiveSelector)) {
      this._removeLike();
    } else {
      this._putLike();
    }
  }

  _deleteCard() {
    this._heandlerDeleteCard(this._cardId)
      .then((res) => {
        console.log(res.message);
      })
      .catch((err) => {
        console.log(err);
      });
    this._element.remove();
    this._popupDelete.close();
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(cardLikeSelector);
    likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    const deleteDelete = this._element.querySelector(cardDeleteSelector);
    if (this._userId === this._author) {
      deleteDelete.classList.add(showBlockSelector);
    }

    deleteDelete.addEventListener("click", () => {
      this._popupDelete.open();
      this._popupDelete.setEventListeners(this._deleteCard, this._cardPhoto.id);
    });
    this._cardPhoto.addEventListener("click", () => {
      this._openImg(this._name, this._link);
    });
  }

  _checkLikes() {
    this._likes.forEach((item) => {
      if (item._id === this._userId) {
        this._like.classList.add(likeActiveSelector);
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector(cardImgSelector);
    this._like = this._element.querySelector(cardLikeSelector);
    this._setEventListeners();

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardPhoto.id = this._cardId;
    this._element.querySelector(cardTitleSelector).textContent = this._name;
    this._element.querySelector(
      likeCountSelector
    ).textContent = this._likes.length;
    this._checkLikes();

    return this._element;
  }
}
