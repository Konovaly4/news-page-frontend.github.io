// класс карточки сохраненной новости
export default class SavedCard {
  constructor (cardData, cardAlerts, api, formErrors, newsContainer, newsCounter) {
    this.cardData = cardData;
    this.cardAlerts = cardAlerts;
    this.api = api;
    this.formErrors = formErrors;
    this.newsContainer = newsContainer;
    this.newsCounter = newsCounter;
    this._alertOn = this._alertOn.bind(this);
    this._alertOff = this._alertOff.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
    this.goToLink = this._goToLink.bind(this);
  }

  // отрисовка разметки карточки
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

  // установка нужного формата даты
  _dataParser () {
    const date = new Date(this.cardData.date).toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return date;
  }

  // сбор DOM-элементов карточки
  setCardData () {
    this._element = this._cardRender();
    this.sideBarButton = this._element.querySelector('.newscard__sidebar-button');
    this.sideBarButton.classList.add('newscard__sidebar-button_garbage');
    this.sideBarAlert = this._element.querySelector('.newscard__sidebar-alert');
    this.sideBarAlert.textContent = this.cardAlerts.savedNews;
    this.newsCardPic = this._element.querySelector('.newscard__pic');
    this.newsCardPic.style.backgroundImage = `url(${this.cardData.image})`;
    this.searchword = this._element.querySelector('.newscard__sidebar-mainword');
    this.searchword.classList.add('newscard__sidebar-mainword_active');
    this.searchword.textContent = this.cardData.keyword;
    this.cardDate = this._element.querySelector('.newscard__date');
    this.cardDate.textContent = this._dataParser();
    this.cardTitle = this._element.querySelector('.newscard__title');
    this.cardTitle.textContent = this.cardData.title;
    this.cardArticle = this._element.querySelector('.newscard__article');
    this.cardArticle.textContent = this.cardData.text;
    this.cardSource = this._element.querySelector('.newscard__source');
    this.cardSource.setAttribute('href', this.cardData.link);
    this.cardSource.textContent = this.cardData.source;
    this._setEventListeners();
    return this._element;
  }

  // появление предупреждения об удалении карточки
  _alertOn () {
    this.sideBarAlert.classList.add('newscard__sidebar-alert_active');
  }

  // скрытие предупреждения об удалении карточки
  _alertOff () {
    this.sideBarAlert.classList.remove('newscard__sidebar-alert_active');
  }

  _goToLink () {
    window.open(this.cardData.link, '_blank');
  }

  // удаление карточки
  _deleteCard () {
    this.api.deleteCard(this.cardData._id)
    .then((res) => {
      this._element.remove();
      this.newsCounter.userBlockData(this.newsContainer);
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert(this.formErrors.serverConnectionError);
      return;
    });
  }

  // установка слушателей
  _setEventListeners () {
    this.sideBarButton.addEventListener('mouseover', this._alertOn);
    this.sideBarButton.addEventListener('mouseout', this._alertOff);
    this.sideBarButton.addEventListener('click', this._deleteCard);
    this._element.addEventListener('click', (event) => {
      if (!event.target.classList.contains('newscard__sidebar-button')) {
        this._goToLink();
      }
    });
  }

}

