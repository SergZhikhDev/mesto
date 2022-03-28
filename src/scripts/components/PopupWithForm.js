import Popup from "./Popup.js";
/*Кроме селектора попапа принимает в конструктор
колбэк сабмита формы.

Содержит приватный метод _getInputValues,
который собирает данные всех полей формы.

Перезаписывает родительский метод setEventListeners.
Метод setEventListeners класса PopupWithForm должен
не только добавлять  обработчик клика иконке закрытия,
но и добавлять обработчик сабмита формы.

Перезаписывает родительский метод close,
так как при закрытии попапа форма должна ещё и сбрасываться.*/

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".form");
    this.submitHandler = this.submitHandler.bind(this);
    this._inputList = Array.from(
      this._form.querySelectorAll(".form__input-area") );
      this.setInputValues = this.setInputValues.bind(this)


  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((item) => {
      data[item.name] = item.value;
    });
    return data;
  }

  submitHandler() {
    this._handleFormSubmit(this._getInputValues());
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.submitHandler);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
