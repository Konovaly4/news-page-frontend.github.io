export default class NewsApi {
  constructor (reqData) {
    this.reqData = reqData;
  }

  // текущая дата
  _currentDate () {
    const currentDate = new Date().toISOString();
    return currentDate;
  }

  // дата на 7 дней позже
  _prevousDate () {
    const dateInterval = 7;
    const prevousDate = new Date(date.setDate(date.getDate() - dateInterval)).toISOString();
    return prevousDate;
  }

// получение статей от сервиса
  getNews (keyword) {
    return fetch (`${this.reqData.reqUrl}q=${keyword}&from${this._currentDate}$to${this._prevousDate}&pageSize=100&apiKey=${this.reqData.apiKey}`, {
      method: 'GET',
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    })
  }
}
