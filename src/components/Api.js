export default class Api {
  constructor({ url, headers }) {
    this._url = url
    this._headers = headers
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
    }
    return Promise.reject(res.statusText)
    })
  }

  editUserDesc(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
      })
  }

  editUserAvatar() {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
      })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
  }

  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res.statusText)
    })
  }

  deleteCard(cardId) {
    fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then((res) => {
      return Promise.reject(res.statusText)
    })
  }
}