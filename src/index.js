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

let popup = document.getElementById('popup');
let authPopup = document.getElementById('popup-authorized');
let button = document.querySelector('.header__button');
let news = document.querySelector('.header__title');
let testButton = document.querySelector('.search__title');
let formValidator = new FormValidator(formErrors);

button.addEventListener('click', function() {
  let registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator);
  registrationPopup._popupOpen();
})

news.addEventListener('click', function() {
  let userPopup = new UserPopup(popup, popupTitles, placeholders, formNotes, formButtons, formValidator);
  userPopup._popupOpen();
})

testButton .addEventListener('click', function() {
  let messagePopup = new MessagePopup(authPopup);
  messagePopup._popupOpen();
})
