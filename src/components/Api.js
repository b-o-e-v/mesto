export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._responseProcessing = this._responseProcessing.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  // Обработка ответа сервера
  _responseProcessing(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.statusText);
  }

  // Обновить фото пользователя
  updatePhoto(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Запросить информацию о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Обновить информацию о пользователе
  editUserDesc(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Обновить аватар
  editUserAvatar() {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Запросить карточки 
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Загрузить карточку на сервер
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  // Поставить лайк
  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  //  Удалить лайк
  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }
}
