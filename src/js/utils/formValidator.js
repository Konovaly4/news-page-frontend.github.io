// валидация полей формы
export default class FormValidator {
  constructor (errors) {
    this.errors = errors;
  }

  checkValidity (inputElement) {
    let currentError = document.getElementById(`error-${inputElement.name}`);
    if (inputElement.value.length === 0) {
      currentError.textContent = this.errors.required;
    } else if (!inputElement.validity.valid && inputElement.name === "email") {
      currentError.textContent = this.errors.emailIncorrect;
    } else if (!inputElement.validity.valid && inputElement.name === "password") {
      currentError.textContent = this.errors.errorPasswordLength;
    } else if (!inputElement.validity.valid && inputElement.name === "name") {
      currentError.textContent = this.errors.nameIncorrect;
    } else {
      currentError.textContent = '';
    }
  }

  validation (popupForm) {
    const inputList = Array.from(popupForm.querySelectorAll('.popup__input'));
    inputList.forEach((elem) => {
      elem.addEventListener('input', this.checkValidity(elem));
    });
    inputList.every((elem) => {
      return elem.validity.valid;
    })
  }
}