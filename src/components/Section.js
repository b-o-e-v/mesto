export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Добавить карточку на страницу
  setItem(element) {
    this._container.prepend(element);
  }

  // Создать карточку
  renderItems(data, id) {
    data.forEach((item) => {
      this._renderer(item, id);
    });
  }
}
