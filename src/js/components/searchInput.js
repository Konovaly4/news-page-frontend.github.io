// класс инпута поиска новостей
export default class SearchInput {
  constructor(newsAction) {
    this.newsAction = newsAction;
    this._inputValidation = this._inputValidation.bind(this);
    this._newsRequest = this._newsRequest.bind(this);
  }

  // сбор DOM-элементов инпута
  _inputData () {
    this.form = document.querySelector('.search__form');
    this.input = document.querySelector('.search__input');
    this.button = document.querySelector('.search__button');
    this.button.setAttribute('disabled', true);
  }

  // активация кнопки отправки данных из инпута
  _inputValidation () {
    if (this.input.value.length == 0) {
      this.button.setAttribute('disabled', true);
    } else {
      this.button.removeAttribute('disabled', true);
    }
  }

  // действие при отправке данных инпута
  _newsRequest (event) {
    event.preventDefault();
    this._inputValidation();
    this.newsAction.createCardList();
  }

  // установка слушателей
  setEventListeners () {
    this._inputData();
    this.input.addEventListener('input', this._inputValidation);
    this.button.addEventListener('click', this._newsRequest);
  }
}