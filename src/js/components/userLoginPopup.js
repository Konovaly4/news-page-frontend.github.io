// попап входа пользователя в систему
import RegistrationPopup from './registrationPopup';

// наследование от попапа регистрации пользователя
export default class UserLoginPopup extends RegistrationPopup {
  constructor(...args) {
    super(...args);
  }

  // установка зависимостей
  setDependencies(dependencies) {
    this.dependencies = dependencies;
  }

  // разметка popup
  _popupForm () {
    const { loginFormTemplate } = this.dependencies;
    const popupForm = loginFormTemplate.cloneNode(true);
    this.popupContent = this.popup.querySelector('.popup__content');
    this.popupContent.append(popupForm);
  }

  // сбор DOM-элементов попапа
  _popupExtension () {
    this._popupForm()
    this.popup.head = this.popup.querySelector('#main-title');
    this.popup.closeButton = this.popup.querySelector('.popup__close');
    this.popup.form = this.popup.querySelector('.popup__form');
    this.popup.noteEmail = this.popup.querySelector('#note-email');
    this.popup.notePassword = this.popup.querySelector('#note-password');
    this.popup.noteButton = this.popup.querySelector('#button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.button = this.popup.querySelector('.popup__button');
    this.popup.emailErr = this.popup.querySelector('#error-email');
    this.popup.passErr = this.popup.querySelector('#error-password');
    this.popup.buttonErr = this.popup.querySelector('#button-err');
  }

  // открытие/закрытие попапа
  _openClose () {
    super._openClose();
  }

  // действия при открытии попапа
  popupOpen () {
    this._popupExtension();
    this._openClose();
    this.popup.form.reset;
    this.popup.head.textContent = this.popupTitles.loginTitle;
    this.popup.noteEmail.textContent = this.formNotes.noteEmail;
    this.popup.notePassword.textContent = this.formNotes.notePassword;
    this.popup.noteButton.textContent = this.formButtons.regButton;
    this.popup.email.setAttribute('placeholder', this.placeholders.email);
    this.popup.password.setAttribute('placeholder', this.placeholders.password);
    this.popup.buttonErr.textContent = '';
    this.popup.button.textContent = this.formButtons.enterButton;
    this._setEventListeners();
  }

  // Валидация полей попапа
  _validation () {
    super._validation();
  }

  // установка состояния кнопки отправки формы
  _setButtonState () {
    super._setButtonState();
  }

  // действия при закрытии попапа
  popupClose () {
    super.popupClose();
  }

  // закрытие попапа при клике вне поля формы
  _popupCloseByClick (event) {
    super._popupCloseByClick(event);
  }

  // закрытие попапа при нажатии на esc
  _popupCloseByEsc (event) {
    super._popupCloseByEsc(event);
  }

  // действия при отправке заполненной формы
  _submit (event) {
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value)
    .then((res) => {
      this.authorization.setAuthorization();
      this.popupClose();
      this.pageReloader.setButtonState();
      return res;
    })
    .catch((err) => {
      console.log(err);
      if (err === '400-Bad Request' || err === '401-Unauthorized') {
        this.popup.buttonErr.textContent = 'Ошибка. Проверьте введенные данные';
        return;
      } else {
        this.popup.buttonErr.textContent = 'Ошибка соединения с сервером';
        return;
      }
    });
  }

  // смена попапов
  _changePopup () {
    const { registrationPopup } = this.dependencies;
    this.popupClose();
    registrationPopup.popupOpen();
  }

  // установка слушателей
  _setEventListeners() {
    super._setEventListeners();
  }
}