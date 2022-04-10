export default class Section {
  constructor({ renderer }, containerSelector) {
      this._container = document.querySelector(containerSelector)
      this._renderer = renderer
  }

  renderItems(items) {
      items.forEach(item => {
          this.addItem(this._renderer(item))
      })
  }



  addItem(item) {

    // const card = this._renderer(item);

    this._container.prepend(item);

  }

}
