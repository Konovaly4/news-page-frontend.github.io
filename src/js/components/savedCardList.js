// класс по отрисовке блока с сохраненными статьями
import SavedCard from './savedCard';

export default class SavedCardList {
  constructor (container, api, cardAlerts) {
    this.container = container;
    this.api = api;
    this.cardAlerts = cardAlerts;
    this.cards = [];
  }

  // добавление зависимостей
  setDependencies (dependencies) {
    this.dependencies = dependencies;
  }

  // добавление карточки
  _addCard (newsCardData, cardAlerts, api) {
    this.cardItem =  new SavedCard(newsCardData, cardAlerts, api);
    this.card = this.cardItem.setCardData();
    this.cards.push(this.card);
    this.container.append(this.card);
  }

  // отрисовка добавленных карточек
  _showCards (result) {
    if (!result) return;
    result.data.forEach((elem) => {
      this._addCard(elem, this.cardAlerts, this.api);
    })
    return;
  }

  // основной метод по отрисовке карточек в блоке
  createCardList () {
    const { newsCounter } = this.dependencies;
    this.api.getCards()
    .then((res) => {
      newsCounter.userBlockData(res);
      this._showCards(res);
    })
  }

}