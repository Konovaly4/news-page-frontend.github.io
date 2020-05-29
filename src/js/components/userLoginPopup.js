import RegistrationPopup from './registrationPopup';

export default class UserLoginPopup extends RegistrationPopup {
  constructor(...args) {
    super(...args);
  }

  setDependencies(dependencies) {
    this.dependencies = dependencies;
  }

  // вставка формы в popup
  _popupForm () {
    const { loginFormTemplate } = this.dependencies;
    const popupForm = loginFormTemplate.cloneNode(true);
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
    this.popup.noteButton = document.getElementById('button-note');
    this.popup.email = this.popup.form.elements.email;
    this.popup.password = this.popup.form.elements.password;
    this.popup.button = document.querySelector('.popup__button');
    this.popup.emailErr = document.getElementById('error-email');
    this.popup.passErr = document.getElementById('error-password');
    this.popup.buttonErr = document.getElementById('button-err');
  }

  _openClose () {
    super._openClose();
  }

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

  _validation () {
    super._validation();
  }

  _setButtonState () {
    super._setButtonState();
  }

  popupClose () {
    super.popupClose();
  }

  _popupCloseByClick (event) {
    if (!event) {
      return;
    } else if (event.target.classList.contains('popup')) {
      this.popupClose();
    }
  }

  _submit (event) {
    console.log('usersubmit');
    event.preventDefault();
    this.api.login(this.popup.email.value, this.popup.password.value)
    .then((res) => {
      this.popupClose();
      this.pageReloader.setButtonState();
      return res;
    });
    console.log('user logged');
  }

  _changePopup () {
    const { registrationPopup } = this.dependencies;
    this.popupClose();
    registrationPopup.popupOpen();
  }

  _setEventListeners() {
    super._setEventListeners();
  }

}