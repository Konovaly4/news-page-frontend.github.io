export default class Authorization {
  constructor () {
  }

  setAuthorization () {
    return localStorage.setItem('authorization', 'true');
  }

  removeAuthorization () {
    return localStorage.removeItem('authorization');
  }

  checkAuthorization () {
    return !!localStorage.getItem('authorization');
  }

}