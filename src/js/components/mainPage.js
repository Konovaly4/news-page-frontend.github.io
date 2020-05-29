export default class MainPage {
  // setHeader - метод класса, устанавливающий надписи кнопок в шапке и активные ссылки
  // header - константа, определение шапки сайта из разметки
  // logout - метод класса userApi, разлогинивающий пользователя
  // registrationPopupActivate - метод, вызывающий открытие регистрационного попапа
  constructor (mainHeaderRender, header, userApi, popup, headerPopup) {
    this.mainHeaderRender = mainHeaderRender;
    this.header = header;
    this.userApi = userApi;
    this.popup = popup;
    this.headerPopup = headerPopup;
    this._logout = this._logout.bind(this);
    this._headerPopupToggler = this._headerPopupToggler.bind(this);
  }

  // сбор данных о элементах шапки сайта
  _headerData () {
    this.headerButton = this.header.querySelector('.header__button');
    this.headerPopupButton = this.header.querySelector('.header__popup-button');
    this.headerLinksContainer = this.header.querySelector('.header__links');
    this.headerButtonName = this.header.querySelector('.header__button-text');
    this.headerButtonLogout = this.header.querySelector('.header__button-logout');
    this.headerNewsLink = this.header.querySelector('.header__link_newspage');
    return;
  }

  _logout () {
    this.userApi.logout()
    .then((res) => {
      this.mainHeaderRender.setButtonState();
      return res.status;
    })
  }

  _headerPopupToggler () {
    if (getComputedStyle(this.headerPopupButton).display === 'block') {
      this.headerPopup.classList.toggle('header__popup_visible');
      this.headerLinksContainer.classList.toggle('header__links_visible');
    }
  }

  // установка слушателей на кнопки и ссылки
  pageState () {
    this._headerData();
    this.mainHeaderRender.setButtonState();
    this.headerPopupButton.addEventListener('click', this._headerPopupToggler);
    this.headerButton.addEventListener('click', () => {
      this.headerButton.hasAttribute('name') ? this.popup.popupOpen() : this._logout();
    });
  }

}