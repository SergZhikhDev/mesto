export default class Section {
  constructor({ items , renderer  }, containerSelector) {
    this._renderedItems = items ;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer
    console.log(items)
  }
  addItem(element) {
    this._container.append(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    });
  }
}
  // const card = new Card(item, ".card-template_type_default");
      // const cardElement = card.generateCard();

      // this.addItem(cardElement);
