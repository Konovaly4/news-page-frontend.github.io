import "./pages/index.css";
import RegistrationPopup from './js/components/registrationPopup';
import UserPopup from './js/components/userPopup';
import MessagePopup from './js/components/messagePopup';
import popupTitles from './js/constants/popupTitles';
import formNotes from './js/constants/formNotes';
import placeholders from './js/constants/placeholders';
import formErrors from './js/constants/formErrors';
import formButtons from './js/constants/formButtons';
import FormValidator from './js/utils/formValidator';
import serverData from './js/constants/serverData';
import UserApi from './js/api/userApi';
import MainHeader from './js/components/mainHeader';
import MainPage from './js/components/mainPage';
import PopupToggler from './js/components/popupToggler';
import Popup from './js/components/Popup';

let popup = document.getElementById('popup');
let popupNote = document.getElementById('button-note');
let authPopup = document.getElementById('popup-authorized');
let button = document.querySelector('.header__button');
let news = document.querySelector('.header__title');
let testButton = document.querySelector('.search__title');
let header = document.querySelector('.header');
let secondaryPopup = document.getElementById('popup-authorized');


// объявление класса валидации форм
let formValidator = new FormValidator(formErrors);

// объявление класса userApi с данными сервера
let userApi = new UserApi(serverData);

// объявление класса попапа входа пользователя
// let userPopup = new UserPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator, userApi);

// объявление класса попапа регистрации
// let registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator, userApi);

// объявление класса установки состояния кнопок хедера
let mainHeader = new MainHeader(userApi, header);

// вызов класса popup
let comPopup = new Popup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator, userApi, mainHeader, secondaryPopup);

// объявление класса попапа-сообщения об успешной авторизации
let messagePopup = new MessagePopup(comPopup);
messagePopup.popupSetup();

// объявление класса установки состояния главной страницы
let mainPage = new MainPage(mainHeader, header, userApi, comPopup);
mainPage.pageState();


