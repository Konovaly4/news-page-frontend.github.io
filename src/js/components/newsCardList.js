// класс создания блока с карточками
export default class NewsCardList {
  constructor (serachBlock, newsResultsBlock, cardItem, container, userapi, newsApi, savedNewsApi, searchMessages, cardAlerts, formErrors) {
    this.serachBlock = serachBlock;
    this.newsResultsBlock = newsResultsBlock;
    this.cardItem = cardItem;
    this.container = container;
    this.cards = [];
    this.results = [];
    this.newsCount = 0;
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
    this.mainInput = this.serachBlock.querySelector('.search__input');
    this.searchButton = this.serachBlock.querySelector('.search__button');
    this.nextButton = this.newsResultsBlock.querySelector('.results__button');
    this.preloader = this.newsResultsBlock.querySelector('.results__loading')
    this.resultErrorBlock = this.newsResultsBlock.querySelector('.results__load-fail');
    this.resultErrorTitle = this.newsResultsBlock.querySelector('.results__fail-title');
    this.resultErrorMessage = this.newsResultsBlock.querySelector('.fail-message')
    this.resultsBlock = this.newsResultsBlock.querySelector('.results__news');
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
    if (news.length === 0) {
      return;
    } else {
      news.forEach((elem) => {
        elem.remove();
        this.newsCount = 0;
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
    const newsCardsColumns = 3
    const newsRow = this.results.slice(this.newsCount, this.newsCount + newsCardsColumns);
    if (newsRow.length < newsCardsColumns) {
      this.nextButton.classList.remove('results__button_active');
    }
    newsRow.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.mainInput.value, this.savedNewsApi, this.formErrors);
    })
    this.newsCount = this.newsCount + newsCardsColumns;
    return;
  }

  // общий метод по заполнению блока новостей
  createCardList () {
    this._newsBlockRenewer();
    this._newsBlockItems();
    this._allBlocksClose();
    this._removeEventListeners();
    this._preloaderToggler();
    this.searchButton.setAttribute('disabled', true);
    this.mainInput.setAttribute('disabled', true);
    this.newsApi.getNews(this.mainInput.value)
      .then((res) => {
        this.searchButton.removeAttribute('disabled', true);
        this.mainInput.removeAttribute('disabled', true);
        this._preloaderToggler();
        if(res.articles.length === 0) {
          this._resultFailBlockOpen();
          return;
        }
        this.results = res.articles;
        this.resultsBlock.classList.add('results__news_active');
        this.nextButton.classList.add('results__button_active');
        this._showCards();
      })
      .catch((err) => {
        this._preloaderToggler();
        this._resultErrorBlockOpen();
        console.log(err);
        return;
      });
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