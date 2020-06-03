export default class UserApi {
  constructor(incomingData) {
    this.ip = incomingData.ip;
    this.url = incomingData.url;
  }

  // создание пользователя
  createUser (userEmail, userPassword, userName) {
    return fetch(`${this.url}${this.ip}/signup`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userName}`,
        email: `${userEmail}`,
        password: `${userPassword}`
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      };
    })
    // Проверка ошибки - текст приходит в методе err.text
    .catch((err) => {
      if (!err.status) {
        return ('ServerConnectionError'); // не удалось поймать текст ошибки, по этому возвращаю это значени
      }
      return err.text()
      .then((text) => {
        return JSON.parse(text);
      })
      .then((text) => {
        return text.message;
      })
      .catch((err) => {
        console.log(err);
      })
    });
  }

  // вход в систему
  login (userEmail, userPassword) {
    return fetch(`${this.url}${this.ip}/signin`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${userEmail}`,
        password: `${userPassword}`
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
    // проверка ошибки: приходит сразу текст ошибки || потеря соединения с сервером (failed to fetch)
    .catch((err) => {
      if (err === '400-Bad Request') {
        return ('Bad Request');
      }
      if (!err) {
        return ('Server connection error'); // не удалось поймать текст ошибки, по этому возвращаю это значени
      }
    });
  }

  // запрос данных пользователя
  getUser () {
    return fetch(`${this.url}${this.ip}/users/me`, {
      redirect: 'follow',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
    .finally(() => { return });
  }

  // изменение имени пользователя
  updateUser (userName) {
    return fetch(`${this.url}${this.ip}/users/me`, {
      redirect: 'follow',
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `${userName}`
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.json();
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
    .catch((err) => {
      alert('Ошибка при изменении данных пользователя');
      console.log(err);
    });
  }

  // выход из системы
  logout () {
    return fetch(`${this.url}${this.ip}/users/me/signout`, {
      redirect: 'follow',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
        return res.status;
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
    .catch((err) => {
      return err;
    });
  }
}