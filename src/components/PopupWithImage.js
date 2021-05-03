import Popup from "./Popup.js";
import { popupImg, popupName } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    popupImg.src = link;
    popupImg.alt = name;
    popupName.textContent = name;
    super.setEventListeners();
    super.open();
  }
}
