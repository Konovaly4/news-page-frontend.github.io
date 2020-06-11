// класс попапа регистрации
export default class RegistrationPopup {
  constructor (popup, popupTitles, placeholders, formNotes, formButtons, submitButtonAlerts, formvalidator, api,  pageReloader, authorization) {
      this.popup = popup;
      this.popupTitles = popupTitles;
      this.placeholders = placeholders;
      this.formNotes = formNotes;
      this.formButtons = formButtons;
      this.submitButtonAlerts = submitButtonAlerts;
      this.formvalidator = formvalidator;
      this.api = api;
      this.pageReloader = pageReloader;
      this.authorization = authorization;
      this.popupClose = this.popupClose.bind(this);
      this._validation = this._validation.bind(this);
      this._setButtonState = this._setButtonState.bind(this);
      this._submit = this._submit.bind(this);
      this._popupCloseByClick = this._popupCloseByClick.bind(this);
      this._changePopup = this._changePopup.bind(this);
      this._popupCloseByEsc = this._popupCloseByEsc.bind(this);
  }

  // добавление зависимостей
  setDependencies(dependencies) {
    this.dependencies = dependencies;
  }

  // отрисовка разметки попапа
  _popupForm () {
    const { regFormTemplate } = this.dependencies;
    const popupForm = regFormTemplate.cloneNode(true);
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
    this.popup.noteName = this.popup.querySelector('#note-name');
    this.popup.noteButton = this.popup.querySelector('#button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.name = this.popup.form.elements.name;
    this.popup.button = this.popup.querySelector('.popup__button');
    this.popup.emailErr = this.popup.querySelector('#error-email');
    this.popup.passErr = this.popup.querySelector('#error-password');
    this.popup.nameErr = this.popup.querySelector('#error-name');
    this.popup.buttonErr = this.popup.querySelector('#button-err');
  }

  // открытие/закрытие
  _openClose () {
    this.popup.classList.toggle('popup_is-opened');
  }

  // действия при октрытии попапа
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
    this.formvalidator.validation(this.popup.form);
  }

  // установка активности кнопки сабмита
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

  // действия при закрытии попапа
  popupClose () {
    this._openClose();
    this.popup.closeButton.removeEventListener('click', this.popupClose);
    this.popup.form.removeEventListener('input', this._validation);
    this.popup.form.removeEventListener('input', this._setButtonState);
    this.popup.closeButton.removeEventListener('click', this.popupClose);
    this.popup.removeEventListener('click', this._popupCloseByClick);
    document.removeEventListener('keydown', this._popupCloseByEsc);
    this.popup.form.remove();
  }

  // закрытие попапа при щелчке вне поля формы
  _popupCloseByClick (event) {
    if (!event) {
      return;
    } else if (event.target.classList.contains('popup')) {
      this.popupClose();
    }
  }

  // закрытие попапа при нажатии на esc
  _popupCloseByEsc (event) {
    if (event.key !== 'Escape') return;
    if (this.popup.classList.contains('popup_is-opened')) {
      this.popupClose();
    }
  }

  // отправка формы после заполнения
  _submit (event) {
    const { messagePopup } = this.dependencies;
    event.preventDefault();
    this.api.createUser(this.popup.email.value, this.popup.password.value, this.popup.name.value)
    .then((res) => {
      this.popupClose();
      this.pageReloader.setButtonState();
      messagePopup.popupOpen();
      return res;
    })
    .catch((err) => {
      if (!err.status) {
        this.popup.buttonErr.textContent = this.submitButtonAlerts.connectionError;
        return;
      }
      return err.text();
    })
    .then((text) => {
      return JSON.parse(text);
    })
    .then((text) => {
      console.log(text.message);
      if (text.message === 'Email is already exists') {
        this.popup.buttonErr.textContent = this.submitButtonAlerts.userIsExist;
        return;
      };
      if (text.message === '"email" must be a valid email') {
        this.popup.buttonErr.textContent = this.submitButtonAlerts.regError;
        return;
      };
    });
  }

  // смена попапа регистрации/входа
  _changePopup () {
    const { userLoginPopup } = this.dependencies;
    this.popupClose();
    userLoginPopup.popupOpen();
  }

  // установка слушателей
  _setEventListeners() {
    this.popup.form.addEventListener('input', this._validation);
    this.popup.form.addEventListener('input', this._setButtonState);
    this.popup.form.addEventListener('submit', this._submit);
    this.popup.noteButton.addEventListener('click', this._changePopup);
    this.popup.closeButton.addEventListener('click', this.popupClose);
    this.popup.addEventListener('click', this._popupCloseByClick);
    document.addEventListener('keydown', this._popupCloseByEsc);
  }

}