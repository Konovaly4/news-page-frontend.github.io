// класс по проверке и установке состояний кнопок хедера на странице с сохраненными новостями
import MainHeaderRender from './mainHeaderRender';

export default class SavedNewsHeaderRender extends MainHeaderRender {
  constructor(...args) {
    super(...args);
  }

  // установка зависимостей
  setDependencies (dependencies) {
    this.dependencies = dependencies;
  }

  // данные кнопки разлогинивания пользователя
  _buttonData () {
    super._buttonData();
  }

  // установка состояния кнопки разлогинивания пользователя/перехода на главную страницу при отсутствии авторизации
  setButtonState () {
    const { newsPage } = this.dependencies;
    this._buttonData();
    if (!this.authorization.checkAuthorization()) {
      this.headerButton.setAttribute('name', 'authMode');
      newsPage._changePage();
      return;
    }
    this.api.getUser()
    .then((res) => {
      console.log(res);
      this.headerButton.removeAttribute('name', 'authMode');
      this.headerButtonName.textContent = res.name;
      }
    )
  }

}