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
    this.popup.head = document.getElementById('main-title');
    this.popup.closeButton = document.querySelector('.popup__close');
    this.popup.form = document.forms.new;
    this.popup.noteEmail = document.getElementById('note-email');
    this.popup.notePassword = document.getElementById('note-password');
    this.popup.noteButton = document.getElementById('button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.button = document.querySelector('.popup__button');
    this.popup.emailErr = document.getElementById('error-email');
    this.popup.passErr = document.getElementById('error-password');
    this.popup.buttonErr = document.getElementById('button-err');
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
    if (!event) {
      return;
    } else if (event.target.classList.contains('popup')) {
      this.popupClose();
    }
  }

  // действия при отправке заполненной формы
  _submit (event) {
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value)
    .then((res) => {
      if (res === 'Bad Request') {
        this.popup.buttonErr.textContent = 'Ошибка. Проверьте введенные данные';
        return;
      }
      if (!res) {
        this.popup.buttonErr.textContent = 'Ошибка соединения с сервером';
        return;
      }
      return res;
    })
    .then((res) => {
      if (res) {
        this.authorization.setAuthorization();
        this.popupClose();
        this.pageReloader.setButtonState();
      }
    })

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