import UserApi from "./userApi";

// наследование класса от UserApi
export default class SavedNewsApi extends UserApi {

  // Сохранение карточки (клик на флаг)
  saveCard (cardData, inputValue) {
    return fetch(`${this.url}${this.ip}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword: `${inputValue}`,
        title: `${cardData.title}`,
        text: `${cardData.description}`,
        date: `${cardData.publishedAt}`,
        source: `${cardData.source.name}`,
        link: `${cardData.url}`,
        image: `${cardData.urlToImage}`,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      }
    })
  }

  // удаление карточки (клик на корзину)
  deleteCard(id) {
    return fetch(`${this.url}${this.ip}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
  }

  // получение карточек
  getCards () {
    return fetch(`${this.url}${this.ip}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      }
    })
  }
}