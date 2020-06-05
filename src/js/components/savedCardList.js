// класс по отрисовке блока с сохраненными статьями
export default class SavedCardList {
  constructor (cardItem, container, api, cardAlerts, formErrors, newsCounter) {
    this.cardItem = cardItem;
    this.container = container;
    this.api = api;
    this.cardAlerts = cardAlerts;
    this.formErrors = formErrors;
    this.newsCounter = newsCounter;
    this.cards = [];
  }

  // добавление карточки
  _addCard (newsCardData, cardAlerts, api, formErrors, newsContainer, newsCounter) {
    this.card = this.cardItem(newsCardData, cardAlerts, api, formErrors, newsContainer, newsCounter).setCardData();
    this.cards.push(this.card);
    this.container.append(this.card);
  }

  // отрисовка добавленных карточек
  _showCards (result) {
    if (!result) return;
    result.data.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.api, this.formErrors, this.container, this.newsCounter);
    })
    return;
  }

  _pageReloader () {
    const news = Array.from(this.container.querySelectorAll('.newscard'));
    if (news.length === 0) return;
    news.forEach((item) => { item.remove() });
  }

  // основной метод по отрисовке карточек в блоке
  createCardList () {
    this._pageReloader();
    this.api.getCards()
    .then((res) => {
      if (!res) {
        alert('Ошибка при доступе к серверу');
        return;
      }
      this._showCards(res);
      this.newsCounter.userBlockData(this.container);
    })
    .catch((err) => console.log(err));
  }


}