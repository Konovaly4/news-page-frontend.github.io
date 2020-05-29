export default class NewsApi {
  constructor (reqData) {
    this.reqData = reqData;
  }

  _currentDate () {
    return new Date().toISOString();
  }

  _prevousDate () {
    return new Date(date.setDate(date.getDate() - 7)).toISOString();
  }

  getNews (keyword) {
    return fetch (`${this.reqData.reqUrl}q=${keyword}&from${this._currentDate}$to${this._prevousDate}&pageSize=100&apiKey=${this.reqData.apiKey}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      console.log(res);
      console.log(res.ok);
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    })
    .catch((err) => {
      console.log(err);
    });
  }
}


/* console.log(date.toLocaleString('ru', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})); */