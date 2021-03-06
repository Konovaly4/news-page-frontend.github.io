// класс рассчета и вывода количества новостей и ключевых слов
export default class NewsCounter {
  constructor (userNewsCount, wordsList, userSubtitle, otherWordsCount, userSpan) {
    this.userNewsCount = userNewsCount;
    this.wordsList = wordsList;
    this.userSubtitle = userSubtitle;
    this.otherWordsCount = otherWordsCount;
    this.userSpan = userSpan;
  }

// вывод количества ключевых слов
  _keyWordsListRender (list) {
    if (list.length === 1) {
      this.wordsList.textContent = `${list[0]}`;
    } else {
      this.wordsList.textContent = `${list[0]}, ${list[1]}`;
    }
    if (list.length > 3) {
      this.otherWordsCount.textContent = `${list.length - 2} другим`;
    } else { this.otherWordsCount.textContent = `${list[2]}` }
  }

  // сбор и сортировка ключевых слов по популярности
  _keyWordsList (container) {
    const mainWordsArray = Array.from(container.querySelectorAll('.newscard__sidebar-mainword')).map((item) => {
      return item.textContent;
    });
    if (mainWordsArray.length === 0) return;
    const mainWordsList = [];
    mainWordsArray.forEach((item) => {
      if (mainWordsList.length === 0 || (!mainWordsList.some((elem) => { return elem === item}))) {
        mainWordsList.push(item);
      }
    })
    mainWordsList.sort((a, b) => {
      const arrayOne = mainWordsArray.filter((i) => {return i === a});
      const arrayTwo = mainWordsArray.filter((i) => {return i === b});
      return (arrayTwo.length - arrayOne.length);
    })
    this._keyWordsListRender(mainWordsList);
      if (mainWordsList.length <= 2) {
        this.otherWordsCount.style.display = 'none';
        this.userSpan.style.display = 'none';
      } else {
        this.otherWordsCount.style.display = 'inline';
        this.userSpan.style.display = 'inline';
      };
    return mainWordsList;
  }

  // вывод имени пользователя и количества сохраненных статей
  userBlockData (container) {
    const newsArray = Array.from(container.querySelectorAll('.newscard'));
    if (newsArray.length === 0) {
      this.userSubtitle.style.display = 'none';
      this.userNewsCount.textContent = `${localStorage.getItem('userName')}, у вас нет сохраненных статей`;
    } else if (newsArray.length <= 4) {
      this.userNewsCount.textContent = `${localStorage.getItem('userName')}, у вас ${newsArray.length} сохраненные статьи`;
    } else {
      this.userNewsCount.textContent = `${localStorage.getItem('userName')}, у вас ${newsArray.length} сохраненных статей`;
    }
    this._keyWordsList(container);
  }

}