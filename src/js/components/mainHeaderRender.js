export default class MainHeaderRender {
  // api - метод, запрашивающий инфо о юзере, если приходит ошибка - юзер не залогинен.
  // header - константа, данные о шапке из разметки сайта.
  // formButtons - константа, объект с заполнениями текстовых полей.
  constructor(api, header, serverData, authorization) {
    this.api = api;
    this.header = header;
    this.serverData = serverData;
    this.authorization = authorization;
  }

  // сбор данных об элементах шапки сайта
  _buttonData () {
    this.headerButton = this.header.querySelector('.header__button');
    this.headerButtonName = this.header.querySelector('.header__button-text');
    this.headerButtonLogout = this.header.querySelector('.header__button-logout');
    this.headerNewsLink = this.header.querySelector('.header__link_newspage');
  }

  // установка значений и состояний элементов шапки сайта
  setButtonState () {
    this._buttonData();
    if (!this.authorization.checkAuthorization()) {
      this.headerButton.setAttribute('name', 'authMode');
      this.headerButtonName.textContent = 'Авторизироваться';
      this.authorization.removeAuthorization();
      this.headerButtonLogout.classList.remove('header__button-logout_active');
      this.headerNewsLink.closest('.header__link-container').classList.remove('header__link-container_visible');
      return;
    }
    this.api.getUser()
    .then((res) => {
      this.headerButton.removeAttribute('name', 'authMode');
      this.headerButtonName.textContent = res.name;
      this.authorization.setAuthorization(res.name);
      this.headerButtonLogout.classList.add('header__button-logout_active');
      this.headerNewsLink.closest('.header__link-container').classList.add('header__link-container_visible');
    })
    .catch((err) => console.log(err));
  }

}