import MainPage from './mainPage';

export default class NewsPage extends MainPage {
  constructor(headerRender, header, userApi) {
    super(headerRender, header, userApi);
    this._headerPopupToggler = this._headerPopupToggler.bind(this);
    this._logout = this._logout.bind(this);
  }

  _headerData () {
    super._headerData();
  }

  _logout () {
    this.userApi.logout()
    .then((res) => {
      this.headerRender.setButtonState();
      return res.status;
    })
  }

  _headerPopupToggler () {
    super._headerPopupToggler();
  }

  _changePage () {
    document.location = '/index.html';
  }

  pageState () {
    this._headerData();
    this.headerRender.setButtonState();
    this.headerPopupButton.addEventListener('click', this._headerPopupToggler);
    this.headerButton.addEventListener('click', this._logout);
    this.headerMainPageLink.addEventListener('click', this._changePage)
  }

}