export default class Popup {
  constructor(popup, popupTitles, placeholders, formNotes , formButtons , formvalidator, api, pageReloader, secondaryPopup) {
    this.popup = popup;
    this.popupTitles = popupTitles;
    this.placeholders = placeholders;
    this.formNotes = formNotes;
    this.formButtons = formButtons;
    this.formvalidator = formvalidator;
    this.api = api;
    this.pageReloader = pageReloader;
    this.secondaryPopup = secondaryPopup;
    this.popupClose = this.popupClose.bind(this);
    this._validation = this._validation.bind(this);
    this._setButtonState = this._setButtonState.bind(this);
    this._userSubmit = this._userSubmit.bind(this);
    this._regSubmit = this._regSubmit.bind(this);
    this._userPopupToggle = this._userPopupToggle.bind(this);
    this._regPopupToggle = this._regPopupToggle.bind(this);
  }

  // вставка формы в popup
  _userPopupForm () {
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

  _regPopupForm () {
    let popupForm = document.forms.new;
    popupForm.innerHTML = `
      <p id ="note-email" class="popup__note"></p>
      <input type="email" required name="email" class="popup__input">
      <span id ="error-email" class="popup__error-message"></span>
      <p id ="note-password" class="popup__note"></p>
      <input type="text" required minlength="5" name="password" class="popup__input">
      <span id="error-password" class="popup__error-message"></span>
      <p id ="note-name" class="popup__note"></p>
      <input type="text" required minlength="2" maxlength="15" name="name" class="popup__input">
      <span id="error-name" class="popup__error-message"></span>
      <p id ="button-err" class="popup__button-err popup__button-err_active"></p>
      <button name="submit" class="button popup__button"></button>
      <p class="popup__button-note popup__button-note_active">или <span id="button-note" class="popup__button-link"></span></p>
    `;
  }

  // сбор элементов popup
  _userPopupExtension () {
    this._userPopupForm()
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

  _regPopupExtension () {
    this._regPopupForm()
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
    this.popup.classList.toggle('popup_is-opened');
  }

  // действия при открытии popup
  userPopupOpen () {
    this._userPopupExtension();
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
    this._setUserListeners();
  }

  regPopupOpen () {
    this._regPopupExtension();
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
    this._setRegListeners();
  }

  // валидация полей popup
  _validation () {
    this.formvalidator.validation(this.popup.form);
  }

  // установка активности кнопки
  _setButtonState () {
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
    this.popup.button.removeEventListener('click', this._userSubmit);
    this.popup.noteButton.removeEventListener('click', this._userPopupToggle);
    this.popup.button.removeEventListener('click', this._regSubmit);
    this.popup.noteButton.removeEventListener('click', this._regPopupToggle);
  }

  // отправка формы
  _userSubmit (event) {
    console.log('usersubmit');
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value)
    .then((res) => {
      this.popupClose();
      this.pageReloader.setButtonState();
      return res.status;
    });
    console.log('user logged');
  }

  _regSubmit (event) {
    console.log('regsubmit');
    event.preventDefault();
    this.api.createUser(this.popup.email.value, this.popup.password.value, this.popup.name.value)
    .then((res) => {
      this.popupClose();
      this.pageReloader.setButtonState();
      this.secondaryPopup.classList.add('popup_is-opened');
      return res.status;
    });
    console.log('user regged');
  }

  _userPopupToggle () {
    this.popupClose();
    this.userPopupOpen();
  }

  _regPopupToggle () {
    this.popupClose();
    this.regPopupOpen();
  }

  // установка слушателей
  _setEventListeners() {
    this.popup.form.addEventListener('input', this._validation);
    this.popup.form.addEventListener('input', this._setButtonState);
    this.popup.closeButton.addEventListener('click', this.popupClose);
  }

  _setUserListeners() {
    this.popup.button.addEventListener('click', this._userSubmit);
    this.popup.noteButton.addEventListener('click', this._regPopupToggle);
  }

  _setRegListeners() {
    this.popup.button.addEventListener('click', this._regSubmit);
    this.popup.noteButton.addEventListener('click', this._userPopupToggle);
  }
}