class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )


  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  addlikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  deletelikeCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }

  avatarUpdate(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
      )

  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-39",
  headers: {
    authorization: "c95f4798-d1a8-4283-9bd6-480d270dfc12",
    "Content-Type": "application/json",
  },
});
