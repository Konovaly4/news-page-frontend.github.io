export default class InputValidator {
  constructor(formErrors) {
    this.formErrors = formErrors;
  }

  errorActivate (inputElem, inputErrorElem) {
    if (!inputElem.validity.valid) {
      inputErrorElem.classList.add('search__input-error_active');
      inputErrorElem.textContent = this.formErrors.inputErr;
    }
    else {
      inputErrorElem.classList.remove('search__input-error_active');
      inputErrorElem.textContent = '';
    }
    return;
  }
}