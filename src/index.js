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
import Popup from './js/components/popup';
import {newsReqData} from './js/constants/newsReqData';
import SearchInput from './js/components/searchInput';
import NewsCardList from './js/components/newsCardList';
import cardAlerts from './js/constants/cardAlerts';
import searchMessages from './js/constants/searchMessages';
import SavedNewsApi from './js/api/savedNewsApi';
import RegistrationPopup from './js/components/registrationPopup';
import UserLoginPopup from './js/components/userLoginPopup';

let popup = document.getElementById('popup');
let popupNote = document.getElementById('button-note');
let authPopup = document.getElementById('popup-authorized');
let nextbutton = document.querySelector('.results__button');
let container = document.querySelector('.news-container');
let headerButton = document.querySelector('.header__button');
let header = document.querySelector('.header');
let secondaryPopup = document.getElementById('popup-authorized');
const headerPopup = document.querySelector('.header__popup');


// объявление класса валидации форм
let formValidator = new FormValidator(formErrors);

// объявление класса userApi с данными сервера
let userApi = new UserApi(serverData);

// объявление класса savedNewsApi с данными сервера
const savedNewsApi = new SavedNewsApi(serverData);

// объявление класса NewsApi с ключом
let newsApi = new NewsApi(newsReqData);

// объявление класса установки состояния кнопок хедера
let mainHeaderRender = new MainHeaderRender(userApi, header);

const registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator, userApi, mainHeaderRender);
const userLoginPopup = new UserLoginPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator, userApi, mainHeaderRender);

// вызов класса popup
// let commonPopup = new Popup(headerButton, registrationPopup, userLoginPopup, mainHeaderRender, secondaryPopup);

// объявление класса попапа-сообщения об успешной авторизации
let messagePopup = new MessagePopup(userLoginPopup);
messagePopup.popupSetup();

registrationPopup.setDependencies({ userLoginPopup, messagePopup});
userLoginPopup.setDependencies({ registrationPopup });

// объявление класса установки состояния главной страницы
let mainPage = new MainPage(mainHeaderRender, header, userApi, registrationPopup, headerPopup);
mainPage.pageState();

// объявление класса создания блока карточек
let newsCardList = new NewsCardList(container, userApi, newsApi, savedNewsApi, searchMessages, cardAlerts);

// объявление класса поля ввода поиска новостей
let searchInput = new SearchInput(newsCardList);
searchInput.setEventListeners();


