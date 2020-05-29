export default class NewsCard {
  constructor (newsCardData, cardAlerts, inputValue, api) {
    this.newsCardData = newsCardData;
    this.cardAlerts = cardAlerts;
    this.inputValue = inputValue;
    this.api = api;
    this._alertOn = this._alertOn.bind(this);
    this._alertOff = this._alertOff.bind(this);
    this._sideBarButtonActivate = this._sideBarButtonActivate.bind(this);
    // this.setEventListeners = this.setEventListeners.bind(this);
  }

  _cardRender () {
    const cardItem = document.createElement('div');
    cardItem.classList.add('newscard');
    const cardPic = document.createElement('div');
    cardPic.classList.add('newscard__pic');
    const sideBar = document.createElement('div');
    sideBar.classList.add('newscard__sidebar');
    const searchword = document.createElement('p');
    searchword.classList.add('newscard__sidebar-mainword');
    const sideBarAlert = document.createElement('p');
    sideBarAlert.classList.add('newscard__sidebar-alert')
    const sideBarButton = document.createElement('button');
    sideBarButton.classList.add('newscard__sidebar-button');
    sideBar.append(searchword, sideBarAlert, sideBarButton);
    cardPic.append(sideBar);
    cardItem.append(cardPic);
    const textBlock = document.createElement('div');
    textBlock.classList.add('newscard__textblock');
    const cardDate = document.createElement('p');
    cardDate.classList.add('newscard__date');
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('newscard__title');
    const cardArticle = document.createElement('p');
    cardArticle.classList.add('newscard__article');
    const cardSource = document.createElement('a');
    cardSource.classList.add('newscard__source');
    cardSource.setAttribute('target', 'blank');
    textBlock.append(cardDate, cardTitle, cardArticle, cardSource);
    cardItem.append(textBlock);
    return cardItem;
  }
// (elem.urlToImage, this.input.value, elem.publishedAt, elem.title, elem.description, elem.url, elem.source.name)

_dataParser () {
  return (new Date(this.newsCardData.publishedAt).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));
}

  setCardData () {
    this._element = this._cardRender();
    console.log(this._element);
    this.sideBarButton = this._element.querySelector('.newscard__sidebar-button');
    this.sideBarButton.classList.add('newscard__sidebar-button_flag');
    this.sideBarAlert = this._element.querySelector('.newscard__sidebar-alert');
    this.sideBarAlert.textContent = this.cardAlerts.mainPage;
    this.newsCardPic = this._element.querySelector('.newscard__pic');
    this.newsCardPic.style.backgroundImage = `url(${this.newsCardData.urlToImage})`;
    this.searchword = this._element.querySelector('.newscard__sidebar-mainword');
    this.searchword.textContent = this.inputValue;
    this.cardDate = this._element.querySelector('.newscard__date');
    this.cardDate.textContent = this._dataParser();
    this.cardTitle = this._element.querySelector('.newscard__title');
    this.cardTitle.textContent = this.newsCardData.title;
    this.cardArticle = this._element.querySelector('.newscard__article');
    this.cardArticle.textContent = this.newsCardData.description;
    this.cardSource = this._element.querySelector('.newscard__source');
    this.cardSource.setAttribute('href', this.newsCardData.url);
    this.cardSource.textContent = this.newsCardData.source.name;
    this._setEventListeners();
    return this._element;
  }

  _alertOn () {
    if (document.querySelector('.header__button').hasAttribute('name')) {
      this.sideBarAlert.classList.add('newscard__sidebar-alert_active');
    }
  }

  _alertOff () {
    if (document.querySelector('.header__button').hasAttribute('name')) {
      this.sideBarAlert.classList.remove('newscard__sidebar-alert_active');
    }
  }

  _sideBarButtonActivate () {
    if (!document.querySelector('.header__button').hasAttribute('name')) {
      if (event.target.classList.contains('newscard__sidebar-button_flag')) {
        this.api.saveCard(this.newsCardData, this.inputValue)
        .then((res) => {
          console.log(res);
          this._element.setAttribute('id', res.data._id);
        });
      } else {
        this.api.deleteCard(this._element.getAttribute('id'));
      };
      this.sideBarButton.classList.toggle('newscard__sidebar-button_flag');
      this.sideBarButton.classList.toggle('newscard__sidebar-button_flag_saved');
    };
  }

  _setEventListeners () {
    this.sideBarButton.addEventListener('mouseover', this._alertOn);
    this.sideBarButton.addEventListener('mouseout', this._alertOff);
    this.sideBarButton.addEventListener('click', this._sideBarButtonActivate);
  }
}

