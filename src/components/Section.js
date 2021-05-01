export default class Section {
  constructor({ data, renderer }, containerSelector, api, generateCard) {
    this._renderedItems = data
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
    this._api = api
    this._generateCard = generateCard
  }

  setItem(element) {
    this._container.prepend(element)
  }

  saveItem(data) {
    this._api
      .addCard(data)
      .then((data) => {
        this.setItem(this._generateCard(data))
      })
      .catch((err) => console.log(err))
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    })
  }
}