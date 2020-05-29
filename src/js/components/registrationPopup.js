export default class RegistrationPopup {
  constructor (popup, popupTitles, placeholders, formNotes, formButtons , formvalidator, api,  pageReloader) {
      this.popup = popup;
      this.popupTitles = popupTitles;
      this.placeholders = placeholders;
      this.formNotes = formNotes;
      this.formButtons = formButtons;
      this.formvalidator = formvalidator;
      this.api = api;
      this.pageReloader = pageReloader;
      this.popupClose = this.popupClose.bind(this);
      this._validation = this._validation.bind(this);
      this._setButtonState = this._setButtonState.bind(this);
      this._submit = this._submit.bind(this);
      this._popupCloseByClick = this._popupCloseByClick.bind(this);
      this._changePopup = this._changePopup.bind(this);
  }

  setDependencies(dependencies) {
    this.dependencies = dependencies;
  }

  _popupForm () {
    const { regFormTemplate } = this.dependencies;
    const popupForm = regFormTemplate.cloneNode(true);
    this.popupContent = this.popup.querySelector('.popup__content');
    this.popupContent.append(popupForm);
  }

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

  _openClose () {
    this.popup.classList.toggle('popup_is-opened');
  }

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

  popupClose () {
    this._openClose();
    this.popup.closeButton.removeEventListener('click', this.popupClose);
    this.popup.form.removeEventListener('input', this._validation);
    this.popup.form.removeEventListener('input', this._setButtonState);
    this.popup.closeButton.removeEventListener('click', this.popupClose);
    this.popup.removeEventListener('click', this._popupCloseByClick);
    this.popup.form.remove();
  }

  _popupCloseByClick (event) {
    if (!event) {
      return;
    } else if (event.target.classList.contains('popup')) {
      this.popupClose();
    }
  }

  _submit (event) {
    console.log('regsubmit');
    const { secondaryPopup } = this.dependencies;
    event.preventDefault();
    this.api.createUser(this.popup.email.value, this.popup.password.value, this.popup.name.value)
    .then((res) => {
      console.log(res);
      console.log(secondaryPopup);
      if (res == 'Email is already exists') {
        this.popup.buttonErr.textContent = 'Такой пользователь уже есть';
        return;
      };
      if (res.includes('must be a valid')) {
        this.popup.buttonErr.textContent = 'Произошла ошибка при регистрации';
        return;
      }
      this.popupClose();
      this.pageReloader.setButtonState();
      secondaryPopup.classList.add('popup_is-opened');
      return res;
    })
  }

  _changePopup () {
    const { userLoginPopup } = this.dependencies;
    this.popupClose();
    userLoginPopup.popupOpen();
  }

  _setEventListeners() {
    this.popup.form.addEventListener('input', this._validation);
    this.popup.form.addEventListener('input', this._setButtonState);
    this.popup.button.addEventListener('click', this._submit);
    this.popup.noteButton.addEventListener('click', this._changePopup);
    this.popup.closeButton.addEventListener('click', this.popupClose);
    this.popup.addEventListener('click', this._popupCloseByClick);
  }

}