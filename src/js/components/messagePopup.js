export default class MessagePopup {
  constructor (popup) {
    this.popup = popup;
    this._popupClose = this._popupClose.bind(this);
  }

  _popupToggle () {
    this.popup.classList.toggle('popup_is-opened');
  }

  _popupOpen () {
    this._popupToggle();
    this.popup.closeButton = document.getElementById('popup-auth-close-button');
    this.setEventListeners();
  }

  _popupClose() {
    this._popupToggle();
    this.popup.closeButton.removeEventListener('click', this._popupClose);
  }

  setEventListeners () {
    this.popup.closeButton.addEventListener('click', this._popupClose);
  }
}