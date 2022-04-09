export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  // renderItems() {
  //   this._items.forEach((item) => {
  //     this.addItem(item);
  //   });
  // }

  renderItems(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }
}
