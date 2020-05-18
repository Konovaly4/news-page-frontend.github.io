import "./pages/index.css";
import RegistrationPopup from './js/components/registrationPopup';
import popupTitles from './js/constants/popupTitles';
import formNotes from './js/constants/formNotes';
import placeholders from './js/constants/placeholders';
import formErrors from './js/constants/formErrors';
import formButtons from './js/constants/formButtons';

let popup = document.getElementById('popup');
let button = document.querySelector('.header__button');
button.addEventListener('click', function() {
  let registrationPopup = new RegistrationPopup(popup, popupTitles, placeholders, formNotes, formErrors, formButtons);
  registrationPopup.popupOpen();
  registrationPopup.setEventListeners();
})
