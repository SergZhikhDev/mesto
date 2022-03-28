export default class UserInfo {
  constructor({ userNameSelector, aboutSelfSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutSelfElement = document.querySelector(aboutSelfSelector);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  getUserInfo() {
    const data = {
      userName: this._userNameElement.textContent,
      about: this._aboutSelfElement.textContent,
    };
    return data;
  }

  setUserInfo({ userName, about }) {
    this._userNameElement.textContent = userName;
    this._aboutSelfElement.textContent = about;
  }
}
