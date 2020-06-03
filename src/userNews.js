import "./pages/user-news.css";
import UserApi from './js/api/userApi';
import SavedNewsApi from './js/api/savedNewsApi';
import SavedNewsHeaderRender from './js/components/savedNewsHeaderRender';
import serverData from './js/constants/serverData';
import NewsPage from './js/components/newsPage';
import SavedCardList from './js/components/savedCardList';
import cardAlerts from './js/constants/cardAlerts';
import NewsCounter from './js/components/newsCounter';
import Authorization from './js/components/authorization';

const header = document.querySelector('.header');
const container = document.querySelector('.news-container');
const userButtonText = document.querySelector('.header__button-text');
const userNewsCount = document.querySelector('.user__news-count');
const wordsList = document.querySelector('#user__keywordslist');
const userSubtitle = document.querySelector('#user__subtitle');
const otherWordsCount = document.querySelector('#user__keywordscount');
const userSpan = document.querySelector('#user__span');


const authorization = new Authorization();

const userApi = new UserApi(serverData);

const savedNewsApi = new SavedNewsApi(serverData);

const newsCounter = new NewsCounter(userButtonText, userNewsCount, wordsList, userSubtitle, otherWordsCount, userSpan);

const savedCardList = new SavedCardList(container, savedNewsApi, cardAlerts)

const savedNewsHeaderRender = new SavedNewsHeaderRender(userApi, header, serverData, authorization);

const newsPage = new NewsPage(savedNewsHeaderRender, header, userApi, authorization, savedCardList);

savedCardList.setDependencies({ newsCounter });
savedNewsHeaderRender.setDependencies({ newsPage });

newsPage.pageState();

