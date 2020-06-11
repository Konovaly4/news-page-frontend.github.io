export default class Authorization {
  constructor () {
  }

  // установка элементов для проверки авторизации
  setAuthorization (userName) {
    localStorage.setItem('authorization', 'true');
    localStorage.setItem('userName', userName);
    return;
  }

  // снятие элементов для проверки авторизации
  removeAuthorization () {
    localStorage.removeItem('authorization');
    localStorage.removeItem('userName');
    return;
  }

  // проверка авторизации
  checkAuthorization () {
    return !!localStorage.getItem('authorization');
  }

  // получение имени пользователя (для кнопки хедера)
  getUser () {
    if (!this.checkAuthorization()) { return } else
    return localStorage.getItem('authorization');
  }

}