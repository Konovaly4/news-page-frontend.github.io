export default class RegistrationPopup {
  constructor(popup, popupTitles, placeholders, formNotes , formErrs , formButtons /*, formvalodator*/) {
    this.popup = popup;
    this.popupTitles = popupTitles;
    this.placeholders = placeholders;
    this.formNotes = formNotes;
    this.formErrs = formErrs;
    this.formButtons = formButtons;
    // this.formvalodator = formvalodator;
  }

  // вставка формы в popup
  popupForm () {
    let popupForm = document.forms.new;
    popupForm.innerHTML = `
      <p id ="note-email" class="popup__note popup__note_active"></p>
      <input type="text" required name="email" class="popup__input">
      <span id ="error-email" class="popup__error-message popup__error-message_active"></span>
      <p id ="note-password" class="popup__note popup__note_active"></p>
      <input type="text" required name="password" class="popup__input">
      <span id="error-password" class="popup__error-message popup__error-message_active"></span>
      <p id ="note-name" class="popup__note popup__note_active"></p>
      <input type="text" required name="name" class="popup__input">
      <span id="error-name" class="popup__error-message popup__error-message_active"></span>
      <p id ="button-err" class="popup__button-err popup__button-err_active"></p>
      <button name="submit" class="button popup__button popup__button_active">Зарегистрироваться</button>
      <p class="popup__button-note popup__button-note_active">или <span id="button-note" class="popup__button-link"></span></p>
    `;
  }

  // сбор элементов popup
  popupExtension () {
    this.popupForm()
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

  openClose () {
    this.popup.classList.toggle('popup_is-opened');
  }

  popupOpen () {
    this.popupExtension();
    this.openClose();
    this.popup.head.textContent = this.popupTitles.regTitle;
    this.popup.noteEmail.textContent = this.formNotes.noteEmail;
    this.popup.notePassword.textContent = this.formNotes.notePassword;
    this.popup.noteName.textContent = this.formNotes.noteName;
    this.popup.noteButton.textContent = this.formButtons.enterButton;
    this.popup.email.setAttribute('placeholder', this.placeholders.email);
    this.popup.password.setAttribute('placeholder', this.placeholders.password);
    this.popup.name.setAttribute('placeholder', this.placeholders.name);
    this.popup.emailErr.textContent = this.formErrs.emailRequired;
    this.popup.passErr.textContent = this.formErrs.errorPasswordRequired;
    this.popup.nameErr.textContent = this.formErrs.nameRequired;
    this.popup.buttonErr.textContent = this.formErrs.buttonErr;
    this.popup.button.textContent = this.formButtons.regButton;
  }

  popupClose () {
    this.openClose();
    this.popup.form.innerHTML = ``;
  }

  setEventListeners() {
    this.popup.closeButton.addEventListener('click', this.popupClose.bind(this));
  }
}