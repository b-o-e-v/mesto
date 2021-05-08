import Popup from "./Popup.js";
import { 
  popupImgSelector,
  popupNameSelector
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  // Открыть попап
  open(name, link) {
    this._popupElement.querySelector(popupImgSelector).src = link;
    this._popupElement.querySelector(popupImgSelector).alt = name;
    this._popupElement.querySelector(popupNameSelector).textContent = name;
    super.open();
  }
}
