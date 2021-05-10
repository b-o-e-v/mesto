import Popup from "./Popup.js";
import { 
  popupImgSelector,
  popupNameSelector
} from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImgElement = this._popupElement.querySelector(popupImgSelector);
  }

  // Открыть попап
  open(name, link) {
    this._popupImgElement.src = link;
    this._popupImgElement.alt = name;
    this._popupElement.querySelector(popupNameSelector).textContent = name;
    super.open();
  }
}
