import NewsCard from './newsCard';

// класс создания блока с карточками
export default class NewsCardList {
  constructor (cardItem, container, userapi, newsApi, savedNewsApi, searchMessages, cardAlerts, formErrors) {
    this.cardItem = cardItem;
    this.container = container;
    this.cards = [];
    this.result = [];
    this.count = 0;
    this.userapi = userapi;
    this.newsApi = newsApi;
    this.savedNewsApi = savedNewsApi;
    this.searchMessages = searchMessages;
    this.cardAlerts = cardAlerts;
    this.formErrors = formErrors;
    this._showCards = this._showCards.bind(this);
  }

  // сбор DOM-элементов блока с новостями
  _newsBlockItems () {
    this.nextButton = document.querySelector('.results__button');
    this.input = document.querySelector('.search__input');
    this.preloader = document.querySelector('.results__loading')
    this.resultErrorBlock = document.querySelector('.results__load-fail');
    this.resultErrorTitle = document.querySelector('.results__fail-title');
    this.resultErrorMessage = document.querySelector('.fail-message')
    this.resultsBlock = document.querySelector('.results__news');
  }

  // прелоадер
  _preloaderToggler () {
    this.preloader.classList.toggle('results__loading_active');
  }

  // сообщение "ничего не найдено"
  _resultFailBlockOpen () {
    this.resultErrorBlock.classList.add('results__load-fail_active');
    this.resultErrorTitle.textContent = this.searchMessages.searchFailTitle;
    this.resultErrorMessage.textContent = this.searchMessages.searchFailMessage;
  }

  // сообщение "произошла ошибка при поиске"
  _resultErrorBlockOpen () {
    this.resultErrorBlock.classList.add('results__load-fail_active');
    this.resultErrorTitle.textContent = this.searchMessages.searchErrorTitle;
    this.resultErrorMessage.textContent = this.searchMessages.searchErrorMessage;
  }

  // Закрытие всех блоков
  _allBlocksClose () {
    this.resultErrorBlock.classList.remove('results__load-fail_active');
    this.resultsBlock.classList.remove('results__news_active');
  }

  // Обновление блока новостей при новом поиске
  _newsBlockRenewer() {
    const news = Array.from(this.container.querySelectorAll('.newscard'));
    console.log(news.length);
    if (news.length === 0) {
      return;
    } else {
      news.forEach((elem) => {
        elem.remove();
        this.count = 0;
      });
    }
  }

  // установка слушателей на карточку новостей
  _cardListeners() {
    this.card.setEventListeners();
  }

  // добавление карточки в блок
  _addCard (newsCardData, cardAlerts, inputValue, api, formErrors) {
    this.card = this.cardItem(newsCardData, cardAlerts, inputValue, api, formErrors).setCardData();
    this.cards.push(this.card);
    this.container.append(this.card);
  }

  // отрисовка карточек в блоке
  _showCards () {
    const resSlicer = this.result.slice(this.count, this.count + 3);
    if (resSlicer.length < 3) {
      this.nextButton.classList.remove('results__button_active');
    }
    resSlicer.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.input.value, this.savedNewsApi, this.formErrors);
    })
    this.count = this.count + 3;
    return;
  }

  // общий метод по заполнению блока новостей
  createCardList () {
    this._newsBlockRenewer();
    this._newsBlockItems();
    this._allBlocksClose();
    this._removeEventListeners();
    this._preloaderToggler();
    this.newsApi.getNews(this.input.value)
      .then((res) => {
        this._preloaderToggler();
        if(res.status && ((res.status === 400 || res.status === 401 || res.status === 429 || res.status === 500))) {
          this._resultErrorBlockOpen();
          return;
        }
        if(res.articles.length === 0) {
          this._resultFailBlockOpen();
          return;
        }
        this.result = res.articles;
        this.resultsBlock.classList.add('results__news_active');
        this.nextButton.classList.add('results__button_active');
        this._showCards();
      })
      .catch((err) => console.log(err));
    this._setEventListeners();
  }

  // установка слушателей
  _setEventListeners() {
    this.nextButton.addEventListener('click', this._showCards);
  }

  // снятие слушателей
  _removeEventListeners() {
    this.nextButton.removeEventListener('click', this._showCards);
  }

}