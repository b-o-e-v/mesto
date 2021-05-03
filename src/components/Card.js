export default class Card {
  constructor(data, cardSelector, openImg, openSubmit, api) {
    this._name = data.name;
    this._link = data.link;
    this._author = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._openImg = openImg;
    this._openSubmit = openSubmit;
    this._deleteCard = this._deleteCard.bind(this);
    this._api = api;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    return cardElement;
  }

  _putLike(cardId) {
    this._api
      .putLike(cardId)
      .then((res) => {
        this._like.classList.add("card__like_active");
        this._element.querySelector(".card__like-count").textContent =
          res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _removeLike(cardId) {
    this._api
      .removeLike(cardId)
      .then((res) => {
        this._like.classList.remove("card__like_active");
        this._element.querySelector(".card__like-count").textContent =
          res.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _likeCard(cardId) {
    if (this._like.classList.contains("card__like_active")) {
      this._removeLike(cardId);
    } else {
      this._putLike(cardId);
    }
  }

  _deleteCard(cardId) {
    this._api.deleteCard(cardId)
    this._element.remove();
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".card__like");
    likeButton.addEventListener("click", () => {
      this._likeCard(this._id);
    });

    const deleteDelete = this._element.querySelector(".card__delete");
    if (document.querySelector(".profile__name").id === this._author) {
      deleteDelete.classList.add("show-block");
    }

    deleteDelete.addEventListener("click", () => {
      this._openSubmit(this._deleteCard, this._cardPhoto.id);
    });
    this._cardPhoto.addEventListener("click", () => {
      this._openImg(this._name, this._link);
    });
  }

  _checkLikes() {
    this._likes.forEach((item) => {
      if (item._id === document.querySelector(".profile__name").id) {
        this._like.classList.add("card__like_active");
      }
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector(".card__img");
    this._like = this._element.querySelector(".card__like");
    this._setEventListeners();

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardPhoto.id = this._id;
    this._element.querySelector(".card__title").textContent = this._name;
    this._element.querySelector(
      ".card__like-count"
    ).textContent = this._likes.length;
    this._checkLikes();

    return this._element;
  }
}
