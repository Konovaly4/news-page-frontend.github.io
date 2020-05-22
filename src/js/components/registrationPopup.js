import UserPopup from './userPopup';

export default class RegistrationPopup extends UserPopup {
// без constructor - наследуется от родительского класса
  // вставка формы в popup
  _popupForm () {
    let popupForm = document.forms.new;
    popupForm.innerHTML = `
      <p id ="note-email" class="popup__note"></p>
      <input type="email" required name="email" class="popup__input">
      <span id ="error-email" class="popup__error-message"></span>
      <p id ="note-password" class="popup__note"></p>
      <input type="text" required minlength="5" name="password" class="popup__input">
      <span id="error-password" class="popup__error-message"></span>
      <p id ="note-name" class="popup__note"></p>
      <input type="text" required minlength="2" maxlength="30" name="name" class="popup__input">
      <span id="error-name" class="popup__error-message"></span>
      <p id ="button-err" class="popup__button-err popup__button-err_active"></p>
      <button name="submit" class="button popup__button"></button>
      <p class="popup__button-note popup__button-note_active">или <span id="button-note" class="popup__button-link"></span></p>
    `;
  }

  // сбор элементов popup
  _popupExtension () {
    this._popupForm()
    this.popup.head = document.getElementById('main-title');
    this.popup.closeButton = document.querySelector('.popup__close');
    this.popup.form = document.forms.new;
    this.popup.noteEmail = document.getElementById('note-email');
    this.popup.notePassword = document.getElementById('note-password');
    this.popup.noteName = document.getElementById('note-name');
    this.popup.noteButton = document.getElementById('button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.name = this.popup.form.elements.name;
    this.popup.button = document.querySelector('.popup__button');
    this.popup.emailErr = document.getElementById('error-email');
    this.popup.passErr = document.getElementById('error-password');
    this.popup.nameErr = document.getElementById('error-name');
    this.popup.buttonErr = document.getElementById('button-err');
  }

  // открытие-закрытие popup
  _openClose () {
    super._openClose();
  }

  // действия при открытии popup
  popupOpen () {
    this._popupExtension();
    this._openClose();
    this.popup.form.reset;
    this.popup.head.textContent = this.popupTitles.regTitle;
    this.popup.noteEmail.textContent = this.formNotes.noteEmail;
    this.popup.notePassword.textContent = this.formNotes.notePassword;
    this.popup.noteName.textContent = this.formNotes.noteName;
    this.popup.noteButton.textContent = this.formButtons.enterButton;
    this.popup.email.setAttribute('placeholder', this.placeholders.email);
    this.popup.password.setAttribute('placeholder', this.placeholders.password);
    this.popup.name.setAttribute('placeholder', this.placeholders.name);
    this.popup.buttonErr.textContent = '';
    this.popup.button.textContent = this.formButtons.regButton;
    this._setEventListeners();
  }

  // валидация полей popup
  _validation () {
    super._validation();
  }

  // установка активности кнопки
  _setButtonState () {
    super._setButtonState();
  }

  // действия при закрытии popup
  _popupClose () {
    super._popupClose();
  }

  // отправка формы
  _submit (event) {
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value, this.popup.name.value);
    this._popupClose();
  }

  _changePopup () {
    this._popupClose();
    registrationPopup.popupOpen();
  }

  // установка слушателей
  _setEventListeners() {
    super._setEventListeners();
  }
}