import UserApi from "./userApi";

export default class SavedNewsApi extends UserApi {

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
    .catch((err) => {
      console.log(err);
      alert('Произошла ошибка при сохранении статьи');
    });
  }

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
      res.ok ? res.status : Promise.reject(`${res.status}-${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

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
      res.ok ? res.json() : Promise.reject(`${res.status}-${res.statusText}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

}