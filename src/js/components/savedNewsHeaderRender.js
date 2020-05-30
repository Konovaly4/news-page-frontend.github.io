import MainHeaderRender from './mainHeaderRender';

export default class SavedNewsHeaderRender extends MainHeaderRender {
  constructor(...args) {
    super(...args);
  }

  setDependencies (dependencies) {
    this.dependencies = dependencies;
  }

  _buttonData () {
    super._buttonData();
  }

  setButtonState () {
    const { newsPage } = this.dependencies;
    this._buttonData();
    this.api.getUser()
    .then((res) => {
      console.log(res);
      if(!res) {
        this.headerButton.setAttribute('name', 'authMode');
        newsPage._changePage();
      } else {
        this.headerButton.removeAttribute('name', 'authMode');
        this.headerButtonName.textContent = res.name;
      }
    })
    return;
  }

}