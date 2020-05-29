export default class Popup {
  constructor(headerButton, registrationPopup, userLoginPopup) {
    this.headerButton = headerButton;
    this.registrationPopup = registrationPopup;
    this.userLoginPopup = userLoginPopup;
    this.regPopupOpen = this.regPopupOpen.bind(this);
    this.userPopupOpen = this.userPopupOpen.bind.bind(this);

  }

  regPopupFirstOpen () {
    if (this.headerButton.hasAttribute('name')) {
      this.registrationPopup.popupOpen();
      this.registrationPopup.noteButton.addEventListener('click', this.userPopupOpen);
    }
  }

  regPopupOpen () {
    this.userLoginPopup.noteButton.removeEventListener('click', this.userPopupOpen);
    this.userLoginPopup.popupClose();
    this.registrationPopup.popupOpen();
  }

  userPopupOpen () {
    this.registrationPopup.noteButton.removeEventListener('click', this.userPopupOpen);
    this.registrationPopup.popupClose();
    this.userLoginPopup.popupOpen();
    this.userLoginPopup.noteButton.addEventListener('click', this.userPopupOpen);
  }

}