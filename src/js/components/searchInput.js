// класс инпута поиска новостей
export default class SearchInput {
  constructor(newsAction, inputValidator) {
    this.newsAction = newsAction;
    this.inputValidator = inputValidator;
    this._newsRequest = this._newsRequest.bind(this);
    this._checkButtonState = this._checkButtonState.bind(this);
    this._validation = this._validation.bind(this);
  }

  // сбор DOM-элементов инпута
  _inputData () {
    this.form = document.querySelector('.search__form');
    this.input = document.querySelector('.search__input');
    this.inputError = document.querySelector('.search__input-error');
    this.button = document.querySelector('.search__button');
    this.button.setAttribute('disabled', true);
  }

  _validation () {
    this.inputValidator.errorActivate(this.input, this.inputError);
  }

  // активация кнопки отправки данных из инпута
  _checkButtonState () {
    if (this.input.value.length == 0) {
      this.button.setAttribute('disabled', true);
    } else {
      this.button.removeAttribute('disabled', true);
    }
  }

  // действие при отправке данных инпута
  _newsRequest (event) {
    event.preventDefault();
    this._checkButtonState();
    this.newsAction.createCardList();
  }

  // установка слушателей
  setEventListeners () {
    this._inputData();
    this.input.addEventListener('input', this._checkButtonState);
    this.input.addEventListener('input', this._validation);
    this.button.addEventListener('click', this._newsRequest);
  }
}