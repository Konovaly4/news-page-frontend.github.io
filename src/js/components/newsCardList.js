import NewsCard from './newsCard';

export default class NewsCardList {
  constructor (container, userapi, newsApi, savedNewsApi, searchMessages, cardAlerts) {
    this.container = container;
    this.cards = [];
    this.result = [];
    this.count = 0;
    this.userapi = userapi;
    this.newsApi = newsApi;
    this.savedNewsApi = savedNewsApi;
    this.searchMessages = searchMessages;
    this.cardAlerts = cardAlerts;
    this._showCards = this._showCards.bind(this);
  }

  _newsBlockItems () {
    this.nextButton = document.querySelector('.results__button');
    this.input = document.querySelector('.search__input');
    this.preloader = document.querySelector('.results__loading')
    this.resultErrorBlock = document.querySelector('.results__load-fail');
    this.resultErrorTitle = document.querySelector('.results__fail-title');
    this.resultErrorMessage = document.querySelector('.fail-message')
    this.resultsBlock = document.querySelector('.results__news');
  }

  _preloaderToggler () {
    this.preloader.classList.toggle('results__loading_active');
  }

  _resultFailBlockOpen () {
    this.resultErrorBlock.classList.add('results__load-fail_active');
    this.resultErrorTitle.textContent = this.searchMessages.searchFailTitle;
    this.resultErrorMessage.textContent = this.searchMessages.searchFailMessage;
  }

  _resultErrorBlockOpen () {
    this.resultErrorBlock.classList.add('results__load-fail_active');
    this.resultErrorTitle.textContent = this.searchMessages.searchErrorTitle;
    this.resultErrorMessage.textContent = this.searchMessages.searchErrorMessage;
  }

  _allBlocksClose () {
    this.resultErrorBlock.classList.remove('results__load-fail_active');
    this.resultsBlock.classList.remove('results__news_active');
  }

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

  // соответствие элементов класса card данным, передаваемым в ответе сервера news api:
  // image - urlToImage
  // mainword - input.value
  // date - publishedAt
  // title - title
  // article - description
  // source - url
  // sourceName - source.name

  _cardListeners() {
    this.card.setEventListeners();
  }

  _addCard (newsCardData, cardAlerts, inputValue, api) {
    this.cardItem =  new NewsCard(newsCardData, cardAlerts, inputValue, api);
    this.card = this.cardItem.setCardData();
    this.cards.push(this.card);
    this.container.append(this.card);
  }

  _showCards () {
    const resSlicer = this.result.slice(this.count, this.count + 3);
    if (resSlicer.length < 3) {
      this.nextButton.classList.remove('results__button_active');
    }
    resSlicer.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.input.value, this.savedNewsApi);
    })
    this.count = this.count + 3;
    return;
  }

  createCardList () {
    this._newsBlockRenewer();
    this._newsBlockItems();
    this._allBlocksClose();
    this._removeEventListeners();
    this._preloaderToggler();
    this.newsApi.getNews(this.input.value)
    .then((res) => {
      this._preloaderToggler();
      if(!res) {
        this._resultErrorBlockOpen();
        return;
      }
      if(res.articles.length === 0) {
        this._resultFailBlockOpen();
        return;
      }
      console.log(res);
      this.result = res.articles;
      this.resultsBlock.classList.add('results__news_active');
      this.nextButton.classList.add('results__button_active');
      this._showCards();
    })
    this._setEventListeners();
  }

  _setEventListeners() {
    this.nextButton.addEventListener('click', this._showCards);
  }

  _removeEventListeners() {
    this.nextButton.removeEventListener('click', this._showCards);
  }

}