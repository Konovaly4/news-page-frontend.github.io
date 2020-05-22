export default class UserPopup {
  constructor(popup, popupTitles, placeholders, formNotes , formButtons , formvalidator, api) {
    this.popup = popup;
    this.popupTitles = popupTitles;
    this.placeholders = placeholders;
    this.formNotes = formNotes;
    this.formButtons = formButtons;
    this.formvalidator = formvalidator;
    this.api = api;
    this.popupClose = this.popupClose.bind(this);
    this.popupOpen = this.popupOpen.bind(this);
    this._validation = this._validation.bind(this);
    this._setButtonState = this._setButtonState.bind(this);
    this._submit = this._submit.bind(this);
  }

  // вставка формы в popup
  _popupForm () {
    let popupForm = document.forms.new;
    popupForm.innerHTML = `
      <p id ="note-email" class="popup__note popup__note_active"></p>
      <input type="email" required name="email" class="popup__input">
      <span id ="error-email" class="popup__error-message"></span>
      <p id ="note-password" class="popup__note popup__note_active"></p>
      <input type="text" required minlength="5" name="password" class="popup__input">
      <span id="error-password" class="popup__error-message"></span>
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
    this.popup.noteButton = document.getElementById('button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.button = document.querySelector('.popup__button');
    this.popup.emailErr = document.getElementById('error-email');
    this.popup.passErr = document.getElementById('error-password');
    this.popup.buttonErr = document.getElementById('button-err');
  }

  // открытие-закрытие popup
  _openClose () {
    this.popup.classList.toggle('popup_is-opened');
  }

  // действия при открытии popup
  popupOpen () {
    this._popupExtension();
    this._openClose();
    this.popup.removeAttribute('name', 'regPopup');
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

  // валидация полей popup
  _validation () {
    this.formvalidator.validation(this.popup.form);
  }

  // установка активности кнопки
  _setButtonState () {
    console.log(this.popup);
    const errorList = Array.from(this.popup.querySelectorAll('.popup__error-message')).every((elem) => {
      return elem.textContent === '';
    });
    if (!errorList) {
      this.popup.button.classList.remove('popup__button_active');
      this.popup.button.setAttribute('disabled', true);
    } else {
      this.popup.button.classList.add('popup__button_active')
      this.popup.button.removeAttribute('disabled', true);
    }
  }

  // действия при закрытии popup
  popupClose () {
    this._openClose();
    this.popup.form.innerHTML = ``;
    this.popup.closeButton.removeEventListener('click', this.popupClose);
    this.popup.form.removeEventListener('input', this._validation);
    this.popup.form.removeEventListener('input', this._setButtonState);
    this.popup.button.removeEventListener('submit', this._submit);
  }

  // отправка формы
  _submit (event) {
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value);
    this.popupClose();
  }

  // установка слушателей
  _setEventListeners() {
    this.popup.form.addEventListener('input', this._validation);
    this.popup.form.addEventListener('input', this._setButtonState);
    this.popup.closeButton.addEventListener('click', this.popupClose);
    this.popup.button.addEventListener('submit', this._submit);
  }
}