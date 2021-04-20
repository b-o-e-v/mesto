import * as constants from './constants.js'

export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameSelector = document.querySelector(nameSelector);
    this._aboutSelector = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    constants.nameInput.value = this._nameSelector.textContent;
    constants.jobInput.value = this._aboutSelector.textContent;
  }

  setUserInfo(profileData) {
    this._nameSelector.textContent = profileData.name;
    this._aboutSelector.textContent = profileData.about;  
  }
}
