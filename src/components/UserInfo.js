import {
  nameInput,
  jobInput
} from '../utils/constants.js'

export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }, api) {
    this._nameSelector = document.querySelector(nameSelector)
    this._aboutSelector = document.querySelector(aboutSelector)
    this._avatarSelector = document.querySelector(avatarSelector)
    this._api = api
  }

  getUserInfo() {
    nameInput.value = this._nameSelector.textContent
    jobInput.value = this._aboutSelector.textContent
  }

  setUserAvatar() {
    this._api
      .getUserInfo()
      .then((data) => {
        this._avatarSelector.src = data.avatar
      })
      .catch((err) => console.log(err))
  }

  setUserDesc() {
    this._api
      .getUserInfo()
      .then((data) => {
        this._nameSelector.textContent = data.name
        this._nameSelector.id = data._id
        this._aboutSelector.textContent = data.about
      })
      .catch((err) => console.log(err))
  }

  setUserInfo() {
    this.setUserAvatar()
    this.setUserDesc() 
  }
}