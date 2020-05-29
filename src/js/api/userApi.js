export default class UserApi {
  constructor(incomingData) {
    this.ip = incomingData.ip;
    this.url = incomingData.url;
  }

  // создание пользователя
  createUser (userEmail, userPassword, userName) {
    return fetch(`${this.url}${this.ip}/signup`, {
      method: 'POST',
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
    .catch((err) => {
      return err.text()
      .then((text) => {
        return JSON.parse(text);
      })
      .then((text) => {
        console.log(text.message);
        return text.message;
      })
      .catch((err) => {
        console.log(err);
      })
    });
  }

  // вход в систему
  login (userEmail, userPassword) {
    console.log('logging');
    return fetch(`${this.url}${this.ip}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${userEmail}`,
        password: `${userPassword}`,
      })
    })
    .then((res) => {
      if(res.ok) {
        return res.status;
      } else {
        return Promise.reject(`${res.status}-${res.statusText}`);
      };
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // запрос данных пользователя
  getUser () {
    return fetch(`${this.url}${this.ip}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
    });
  }

  // изменение имени пользователя
  updateUser (userName) {
    return fetch(`${this.url}${this.ip}/users/me`, {
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
      console.log(err);
    });
  }

  // выход из системы
  logout () {
    console.log('logging out');
    alert('Вы действительно хотите выйти?');
    return fetch(`${this.url}${this.ip}/users/me/signout`, {
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
      console.log(err);
    });
  }
}