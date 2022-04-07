export default class UserInfo {
  constructor({ userNameSelector, aboutSelfSelector,avatarSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._aboutSelfElement = document.querySelector(aboutSelfSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
    this.setAvatar = this.setAvatar.bind(this);
  }

  getUserInfo() {
    const data = {
      userName: this._userNameElement.textContent,
      aboutSelf: this._aboutSelfElement.textContent,
      avatar: this._avatarElement.src
    };
    return data;
  }

  setUserInfo( userName, aboutSelf) {
    this._userNameElement.textContent = userName;
    this._aboutSelfElement.textContent = aboutSelf;

  }
  setAvatar( avatar ) {
  this._avatarElement.src = avatar;
}

}
