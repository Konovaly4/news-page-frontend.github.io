export default class PopupToggler {
  constructor (regPopup, userPopup, popup) {
    this.regPopup = regPopup;
    this.userPopup = userPopup;
    this.popup = popup;
    this._regOpen = this._regOpen.bind(this);
    this._userOpen = this._userOpen.bind(this);
  }

  _popupData () {
    this.popup = document.getElementById('popup');
    this.popupNote = document.getElementById('button-note');
  }

  _regOpen () {
    this.userPopup.popupClose();
    this.regPopup.popupOpen();
  }

  _userOpen () {
    this.regPopup.popupClose();
    this.userPopup.popupOpen();
  }

  toggle () {
      this.popup.hasAttribute('name') ? this._userOpen() : this._regOpen();
  }
}