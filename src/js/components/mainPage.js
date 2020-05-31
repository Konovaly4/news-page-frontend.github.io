export default class MainPage {
  // setHeader - метод класса, устанавливающий надписи кнопок в шапке и активные ссылки
  // header - DOM - элемент шапки сайта из разметки
  // userApi - класс отвечающий за обращение к данным пользователя
  // popup - DOM - элемент попапа
  // headerPopup - DOM - элемент попапа хедера
  // serverData - константа, данные запроса на сервер
  constructor (headerRender, header, userApi, popup, headerPopup, serverData) {
    this.headerRender = headerRender;
    this.header = header;
    this.userApi = userApi;
    this.popup = popup;
    this.headerPopup = headerPopup;
    this.serverData = serverData;
    this._logout = this._logout.bind(this);
    this._headerPopupToggler = this._headerPopupToggler.bind(this);
    this._changePage = this._changePage.bind(this);
    this._mainpage = this._mainpage.bind(this);
    this._buttonCheck = this._buttonCheck.bind(this);
  }

  // сбор данных о элементах шапки сайта
  _headerData () {
    this.headerButton = this.header.querySelector('.header__button');
    this.headerPopupButton = this.header.querySelector('.header__popup-button');
    this.headerLinksContainer = this.header.querySelector('.header__links');
    this.headerButtonName = this.header.querySelector('.header__button-text');
    this.headerButtonLogout = this.header.querySelector('.header__button-logout');
    this.headerNewsLink = this.header.querySelector('.header__link_newspage');
    this.headerMainPageLink = this.header.querySelector('.header__link_mainpage');
    return;
  }

  // разлогинивание
  _logout () {
    this.userApi.logout()
    .then((res) => {
      this.headerRender.setButtonState();
      return res.status;
    })
  }

  // открытие/закрытие попапа при изменении ширины страницы
  _headerPopupToggler () {
    if (getComputedStyle(this.headerPopupButton).display === 'block') {
      this.headerPopup.classList.toggle('header__popup_visible');
      this.headerLinksContainer.classList.toggle('header__links_visible');
    }
  }

  // проверка состояния кнопки авторизации и выбор действия
  _buttonCheck () {
    this.headerButton.hasAttribute('name') ? this.popup.popupOpen() : this._logout();
  }

  // смена страницы (переход на "сохраненные статьи")
  _changePage () {
    this.headerPopupButton.removeEventListener('click', this._headerPopupToggler);
    this.headerButton.removeEventListener('click', this._buttonCheck);
    this.headerNewsLink.removeEventListener('click', this._changePage);
    this.headerMainPageLink.removeEventListener('click', this._mainpage)
    document.location = '/user-news.html';
  }

  // переход на текущую статью  (в случае клика по кнопке "Главная")
  _mainpage () {
    document.location = '/index.html';
  }

  // установка слушателей на кнопки и ссылки
  pageState () {
    this._headerData();
    this.headerRender.setButtonState();
    this.headerPopupButton.addEventListener('click', this._headerPopupToggler);
    this.headerButton.addEventListener('click', this._buttonCheck);
    this.headerNewsLink.addEventListener('click', this._changePage);
    this.headerMainPageLink.addEventListener('click', this._mainpage)
  }

}