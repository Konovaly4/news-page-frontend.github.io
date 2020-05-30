export default class NewsCounter {
  constructor (userButtonText, userNewsCount, wordsList, userSubtitle, otherWordsCount, userSpan) {
    this.userButtonText = userButtonText;
    this.userNewsCount = userNewsCount;
    this.wordsList = wordsList;
    this.userSubtitle = userSubtitle;
    this.otherWordsCount = otherWordsCount;
    this.userSpan = userSpan;
  }

  /*
  - userButton - кнопка пользователя в хедере
  - userNewsCount - имя пользователя в колонке Сохраненные статьи
  - wordsList - список ключевых слов в строке "По ключевым словам"
  - otherWordsCount - добавочная строка "и "" другим"
  */

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

  _keyWordsList (result) {
    if (!result) return;
    const mainWordsArray = result.data.map((elem) => { return elem.keyword; })
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

  userBlockData (result) {
    if (!result) {
      this.userSubtitle.style.display = 'none';
      this.userNewsCount.textContent = `${this.userButtonText.textContent}, у вас нет сохраненных статей`;
    } else {
      this.userNewsCount.textContent = `${this.userButtonText.textContent}, у вас ${result.data.length} сохраненных статей`;
    }
    this._keyWordsList(result);
  }

}