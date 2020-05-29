import "./pages/user-news.css";
import UserApi from './js/api/userApi';
import SavedNewsHeaderRender from './js/components/savedNewsHeaderRender';
import serverData from './js/constants/serverData';
import NewsPage from './js/components/newsPage';

const header = document.querySelector('.header');


const userApi = new UserApi(serverData);

const savedNewsHeaderRender = new SavedNewsHeaderRender(userApi, header, serverData);

const newsPage = new NewsPage(savedNewsHeaderRender, header, userApi);

savedNewsHeaderRender.setDependencies({ newsPage });

newsPage.pageState();

