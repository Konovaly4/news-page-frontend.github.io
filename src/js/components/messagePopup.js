// попап "Пользователь успешно зарегистрирован"
export default class MessagePopup {
  constructor (popup, userPopup) {
    this.popup = popup;
    this.userPopup = userPopup;
    this._popupClose = this._popupClose.bind(this);
    this._openUserForm = this._openUserForm.bind(this);
    this._popupCloseByClick = this._popupCloseByClick.bind(this);
    this._popupCloseByEsc = this._popupCloseByEsc.bind(this);
  }

  // сбор элементов DOM-дерева попапа
  _popupSetup () {
    this.popup.classList.remove('popup_is-opened');
    this.popupCloseButton = this.popup.querySelector('#popup-auth-close-button');
    this.popupNote = this.popup.querySelector('#login-note');
  }

  popupOpen () {
    this._popupSetup();
    this.popup.classList.add('popup_is-opened');
    this._setEventListeners();
  }

  // закрытие попапа
  _popupClose () {
    this.popup.classList.remove('popup_is-opened');
    this._removeEventListeners();
  }

  // закрытие попапа при щелчке вне поля формы
  _popupCloseByClick (event) {
    if (!event) {
      return;
    } else if (event.target.classList.contains('popup')) {
      this._popupClose();
    }
  }

  // закрытие попапа при нажатии на esc
  _popupCloseByEsc (event) {
    if (event.key !== 'Escape') return;
    if (this.popup.classList.contains('popup_is-opened')) {
      this._popupClose();
    }
  }

  // открытие основной формы (входа пользователя в систему)
  _openUserForm() {
    this.popup.classList.remove('popup_is-opened');
    this.userPopup.popupOpen();
  }

  // установка слушателей
  _setEventListeners () {
    this.popupCloseButton.addEventListener('click', this._popupClose);
    this.popupNote.addEventListener('click', this._openUserForm);
    this.popup.addEventListener('click', this._popupCloseByClick);
    document.addEventListener('keydown', this._popupCloseByEsc);
  }

  // снятие слушателей
    // установка слушателей
  _removeEventListeners () {
    this.popupCloseButton.removeEventListener('click', this._popupClose);
    this.popupNote.removeEventListener('click', this._openUserForm);
    this.popup.removeEventListener('click', this._popupCloseByClick);
    document.removeEventListener('keydown', this._popupCloseByEsc);
  }
}