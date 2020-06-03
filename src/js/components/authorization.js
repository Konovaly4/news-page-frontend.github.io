export default class Authorization {
  constructor () {
  }

  setAuthorization (userName) {
    localStorage.setItem('authorization', 'true');
    localStorage.setItem('userName', userName);
    return;
  }

  removeAuthorization () {
    localStorage.removeItem('authorization');
    localStorage.removeItem('userName');
    return;
  }

  checkAuthorization () {
    return !!localStorage.getItem('authorization');
  }

  getUser () {
    if (!this.checkAuthorization()) { return } else
    return localStorage.getItem('authorization');
  }

}