// класс по отрисовке блока с сохраненными статьями
import SavedCard from './savedCard';

export default class SavedCardList {
  constructor (cardItem, container, api, cardAlerts, formErrors) {
    this.cardItem = cardItem;
    this.container = container;
    this.api = api;
    this.cardAlerts = cardAlerts;
    this.formErrors = formErrors;
    this.cards = [];
  }

  // добавление зависимостей
  setDependencies (dependencies) {
    this.dependencies = dependencies;
  }

  // добавление карточки
  _addCard (newsCardData, cardAlerts, api, formErrors) {
    this.card = this.cardItem(newsCardData, cardAlerts, api, formErrors).setCardData();
    this.cards.push(this.card);
    this.container.append(this.card);
  }

  // отрисовка добавленных карточек
  _showCards (result) {
    if (!result) return;
    result.data.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.api, this.formErrors);
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
    const { newsCounter } = this.dependencies;
    this._pageReloader();
    this.api.getCards()
    .then((res) => {
      newsCounter.userBlockData(res);
      this._showCards(res);
    })
  }

}