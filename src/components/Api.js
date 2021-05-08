export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._responseProcessing = this._responseProcessing.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  _responseProcessing(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.statusText);
  }

  updatePhoto(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  editUserDesc(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  editUserAvatar() {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._responseProcessing(res);
    });
  }
}
