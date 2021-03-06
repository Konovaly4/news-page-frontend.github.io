import "./pages/index.css";
import MessagePopup from './js/components/messagePopup';
import popupTitles from './js/constants/popupTitles';
import formNotes from './js/constants/formNotes';
import placeholders from './js/constants/placeholders';
import formErrors from './js/constants/formErrors';
import formButtons from './js/constants/formButtons';
import FormValidator from './js/utils/formValidator';
import serverData from './js/constants/serverData';
import UserApi from './js/api/userApi';
import NewsApi from './js/api/newsApi';
import MainHeaderRender from './js/components/mainHeaderRender';
import MainPage from './js/components/mainPage';
import {newsReqData} from './js/constants/newsReqData';
import SearchInput from './js/components/searchInput';
import NewsCardList from './js/components/newsCardList';
import cardAlerts from './js/constants/cardAlerts';
import searchMessages from './js/constants/searchMessages';
import SavedNewsApi from './js/api/savedNewsApi';
import RegistrationPopup from './js/components/registrationPopup';
import UserLoginPopup from './js/components/userLoginPopup';
import submitButtonAlerts from './js/constants/submitButtonAlerts';
import Authorization from './js/components/authorization';
import NewsCard from './js/components/newsCard';
import InputValidatir from './js/utils/inputValidator';

const popup = document.querySelector('#popup');
const container = document.querySelector('.news-container');
const header = document.querySelector('.header');
const loginSuccessPopup = document.querySelector('#popup-authorized');
const headerPopup = document.querySelector('.header__popup');
const serachBlock = document.querySelector('.search');
const newsResultsBlock = document.querySelector('.results');
const regFormTemplate = document.querySelector('#reg-form-template').content.querySelector('.popup__form');
const loginFormTemplate = document.querySelector('#login-form-template').content.querySelector('.popup__form');

// объявление класса валидатора инпута поиска новостей
const inputValidator = new InputValidatir(formErrors);

// объявление класса установки/снятия авторизации
const authorization = new Authorization();

// объявление класса валидации форм
const formValidator = new FormValidator(formErrors);

// объявление класса userApi с данными сервера
const userApi = new UserApi(serverData);

// объявление класса savedNewsApi с данными сервера
const savedNewsApi = new SavedNewsApi(serverData);

// объявление класса NewsApi с ключом
const newsApi = new NewsApi(newsReqData);

const cardItem = (cardData, cardAlerts, inputValue, api, formErrors) => {
  return new NewsCard(cardData, cardAlerts, inputValue, api, formErrors);
};

// объявление класса установки состояния кнопок хедера
const mainHeaderRender = new MainHeaderRender(userApi, header, serverData, authorization, formButtons, formErrors);

const registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formButtons, submitButtonAlerts, formValidator, userApi, mainHeaderRender, authorization);
const userLoginPopup = new UserLoginPopup(popup, popupTitles, placeholders, formNotes, formButtons, submitButtonAlerts, formValidator, userApi, mainHeaderRender, authorization);

// объявление класса попапа-сообщения об успешной авторизации
const messagePopup = new MessagePopup(loginSuccessPopup, userLoginPopup);

// объявление класса установки состояния главной страницы
const mainPage = new MainPage(mainHeaderRender, header, userApi, registrationPopup, headerPopup, serverData, authorization, formErrors);
mainPage.pageState();

// объявление класса создания блока карточек
const newsCardList = new NewsCardList(serachBlock, newsResultsBlock, cardItem, container, userApi, newsApi, savedNewsApi, searchMessages, cardAlerts, formErrors);

// объявление класса поля ввода поиска новостей
const searchInput = new SearchInput(serachBlock, newsCardList, inputValidator);
searchInput.setEventListeners();

registrationPopup.setDependencies({ userLoginPopup, messagePopup, regFormTemplate});
userLoginPopup.setDependencies({ registrationPopup, loginFormTemplate });

