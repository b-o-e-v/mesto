export default class Section {
  constructor(renderer, containerSelector, api, generateCard) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._api = api;
    this._generateCard = generateCard;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  saveItem(data, close) {
    this._api
      .addCard(data)
      .then((data) => {
        this.setItem(this._generateCard(data));
        close();
      })
      .catch((err) => console.log(err));
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
