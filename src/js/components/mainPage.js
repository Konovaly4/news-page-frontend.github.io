export default class MainPage {
  // setHeader - метод класса, устанавливающий надписи кнопок в шапке и активные ссылки
  // header - константа, определение шапки сайта из разметки
  // logout - метод класса userApi, разлогинивающий пользователя
  // registrationPopupActivate - метод, вызывающий открытие регистрационного попапа
  constructor (mainHeader, header, userApi, popup) {
    this.mainHeader = mainHeader;
    this.header = header;
    this.userApi = userApi;
    this.popup = popup;
    this._logout = this._logout.bind(this);
  }

  // сбор данных о элементах шапки сайта
  _headerData () {
    this.headerButton = this.header.querySelector('.header__button');
    this.headerButtonName = this.header.querySelector('.header__button-text');
    this.headerButtonLogout = this.header.querySelector('.header__button-logout');
    this.headerNewsLink = this.header.querySelector('.header__link_newspage');
    return;
  }

  _logout () {
    this.userApi.logout()
    .then((res) => {
      this.mainHeader.setButtonState();
      return res.status;
    })
  }

  // установка слушателей на кнопки и ссылки
  pageState () {
    this._headerData();
    this.mainHeader.setButtonState();
    this.headerButton.addEventListener('click', () => {
      this.headerButton.hasAttribute('name') ? this.popup.regPopupOpen() : this._logout();
    });
  }


}