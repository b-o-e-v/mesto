import { 
  nameInputSelector,
  jobInputSelector
} from "../utils/constants.js";

export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  // Получить информацию о пользователе
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  // Установить значения инпутов
  setInputFormValues() {
    document.querySelector(
      nameInputSelector
    ).value = this._nameElement.textContent;
    document.querySelector(
      jobInputSelector
    ).value = this._aboutElement.textContent;
  }

  // Установить "имя" и "о пользователе"
  _setUserDesc({ name, about }) {
    if (name && about) {
      this._nameElement.textContent = name;
      this._aboutElement.textContent = about;
    }
  }

  // Установить аватар
  _setUserAvatar(avatar) {
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }

  // Установить информацию о пользователе
  setUserInfo({ name, about, avatar }) {
    this._setUserDesc({ name, about });
    this._setUserAvatar(avatar);
  }
}
