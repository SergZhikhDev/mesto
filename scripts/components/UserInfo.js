export default class UserInfo {
  constructor(
    userNameSelector,
    aboutSelfSelector,
    userNewNameSelector,
    aboutSelfNewSelector
  ) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutSelfElement = document.querySelector(aboutSelfSelector);
    this._userNameNewElement = document.querySelector(userNewNameSelector);
    this._aboutSelfNewElement = document.querySelector(aboutSelfNewSelector);
  }

  getUserInfo() {
    const data = {
      userName: this._userNameElement.textContent,
      aboutSelf: this._aboutSelfElement.textContent,
    };
    return data;
  }

  setUserInfo() {
    this._userNameElement.textContent = this._userNameNewElement.value;
    this._aboutSelfElement.textContent = this._aboutSelfNewElement.value;
  }
}
