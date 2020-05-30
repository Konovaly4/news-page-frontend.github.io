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

const popup = document.getElementById('popup');
const container = document.querySelector('.news-container');
const header = document.querySelector('.header');
const secondaryPopup = document.getElementById('popup-authorized');
const headerPopup = document.querySelector('.header__popup');
const regFormTemplate = document.querySelector('#reg-form-template').content.querySelector('.popup__form');
const loginFormTemplate = document.querySelector('#login-form-template').content.querySelector('.popup__form');


// объявление класса валидации форм
const formValidator = new FormValidator(formErrors);

// объявление класса userApi с данными сервера
const userApi = new UserApi(serverData);

// объявление класса savedNewsApi с данными сервера
const savedNewsApi = new SavedNewsApi(serverData);

// объявление класса NewsApi с ключом
const newsApi = new NewsApi(newsReqData);

// объявление класса установки состояния кнопок хедера
const mainHeaderRender = new MainHeaderRender(userApi, header, serverData);

const registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formButtons, submitButtonAlerts, formValidator, userApi, mainHeaderRender);
const userLoginPopup = new UserLoginPopup(popup, popupTitles, placeholders, formNotes, formButtons, submitButtonAlerts, formValidator, userApi, mainHeaderRender);

// объявление класса попапа-сообщения об успешной авторизации
const messagePopup = new MessagePopup(userLoginPopup);
messagePopup.popupSetup();

registrationPopup.setDependencies({ userLoginPopup, secondaryPopup, regFormTemplate});
userLoginPopup.setDependencies({ registrationPopup, loginFormTemplate });

// объявление класса установки состояния главной страницы
const mainPage = new MainPage(mainHeaderRender, header, userApi, registrationPopup, headerPopup, serverData);
mainPage.pageState();

// объявление класса создания блока карточек
const newsCardList = new NewsCardList(container, userApi, newsApi, savedNewsApi, searchMessages, cardAlerts);

// объявление класса поля ввода поиска новостей
const searchInput = new SearchInput(newsCardList);
searchInput.setEventListeners();


