export default class MessagePopup {
  constructor (mainPopupForm) {
    this.mainPopupForm = mainPopupForm;
    this._popupClose = this._popupClose.bind(this);
    this._openMainForm = this._openMainForm.bind(this);
  }

  popupSetup () {
    this.popup = document.getElementById('popup-authorized');
    this.popup.classList.remove('popup_is-opened');
    this.popupCloseButton = document.getElementById('popup-auth-close-button');
    this.popupNote = document.getElementById('login-note');
    this.setEventListeners();
  }

  _popupClose () {
    this.popup.classList.remove('popup_is-opened');
  }

  _openMainForm() {
    this.popup.classList.remove('popup_is-opened');
    this.mainPopupForm.popupOpen();
  }

  setEventListeners () {
    this.popupCloseButton.addEventListener('click', this._popupClose);
    this.popupNote.addEventListener('click', this._openMainForm);
  }
}