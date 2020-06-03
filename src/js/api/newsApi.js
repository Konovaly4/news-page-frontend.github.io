export default class NewsApi {
  constructor (reqData) {
    this.reqData = reqData;
  }

  // текущая дата
  _currentDate () {
    return new Date().toISOString();
  }

  // дата на 7 дней позже
  _prevousDate () {
    return new Date(date.setDate(date.getDate() - 7)).toISOString();
  }

// получение статей от сервиса
  getNews (keyword) {
    return fetch (`${this.reqData.reqUrl}q=${keyword}&from${this._currentDate}$to${this._prevousDate}&pageSize=100&apiKey=${this.reqData.apiKey}`, {
    // return fetch (`https://praktikum.tk/news/v2/top-headlines?country=us&apiKey= 123123123123123123`, {
      method: 'GET',
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    })
    .catch((err) => {
      return err;
    });
  }
}
