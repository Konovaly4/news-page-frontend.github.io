import MainPage from './mainPage';

// класс страницы с сохраненными новостями
export default class NewsPage extends MainPage {
  constructor(headerRender, header, userApi, headerPopup, authorization, cardsRender, formErrors) {
    super(headerRender, header, userApi);
    this.headerPopup = headerPopup;
    this.authorization = authorization;
    this.cardsRender = cardsRender;
    this.formErrors = formErrors;
    this._headerPopupToggler = this._headerPopupToggler.bind(this);
    this._logout = this._logout.bind(this);
  }

  // Сбор данных шапки сайта
  _headerData () {
    super._headerData();
  }

  // выход из системы
  _logout () {
    this.userApi.logout()
    .then((res) => {
      this.authorization.removeAuthorization();
      this.headerRender.setButtonState();
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert(this.formErrors.serverConnectionError);
      return;
    })
  }

  // открытие/закрытие попапа в зависимости от ширины страницы
  _headerPopupToggler () {
    super._headerPopupToggler();
  }

  // смена страницы на главную
  _changePage () {
    this.headerPopupButton.removeEventListener('click', this._headerPopupToggler);
    this.headerButton.removeEventListener('click', this._logout);
    this.headerMainPageLink.removeEventListener('click', this._changePage)
    document.location = '/index.html';
  }

  // основная функция по отрисовке и установке методов страницы сохраненных новостей
  pageState () {
    this._headerData();
    this.headerRender.setButtonState();
    this.cardsRender.createCardList();
    this.headerPopupButton.addEventListener('click', this._headerPopupToggler);
    this.headerButton.addEventListener('click', this._logout);
    this.headerMainPageLink.addEventListener('click', this._changePage)
  }

}