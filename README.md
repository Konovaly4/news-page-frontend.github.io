# news-page-frontend.github.io

v0.0.3 - Backend part provided

v0.0.2 - Review issues fixed

v0.0.1 - First edition

## О проекте

[Проект представлен по ссылке](https://konovaly4.github.io/news-page-frontend.github.io/). 

Сервис для поиска новостей по ключевым словам.

## Используемые языки, модули и библиотеки:

- HTML
- CSS
- Git
- Webpack

## Для проверки работы

- Клонировать репозиторий на локальный компьютер
- Зайти в репозиторий с терминала и установите зависимости `npm install`.
- Командой `npm run dev` запустить страницы в режиме разработки.
- Командой `npm run build` сделать продакшн-сборку страниц.
- Добавлен скрипт для деплоя файлов на сервер: `npm run serverDeploy`.

## Описание функциональности и методов проверки работы

Проект двустраничный, на главной осуществляется поиск новостей по ключевым словам, на странице пользователя хранятся статьи, сохраненные пользователем. Страница доступна после входа пользователя в систему.

## Основная страница (index.html)

### Блоки header и search

Для регистрации пользователя в блоке `header` нажмите на кнопку `Авторизироваться`, затем введите данные регистрации пользователя в появившуюся форму. После отправки формы появится окно `Пользователь успешно зарегистрирован` и ссылка `Выполнить вход`. Если пользователь с указанным адресом электронной почты уже есть, появится соответствующая ошибка, далее будет необходимо выполнить вход в систему - для этого нажмите на соответствующую ссылку для смены формы регистрации/входа в систему.

Для поиска новостей необходимо ввести ключевое слово не короче 2-х символов в поле c плейсхолдером `Введите тему новости` и нажать на кнопку `Искать`. При поиске новостей появится прелоудер, по результатам поиска - карточки с новостями или сообщения с соответствующими ошибками.

### Блок results

В блоке `results` отражаются карточки с новостями, по результатам поиска. Для новости будет выведена картинка при ее наличии у новостного агрегатора. Новости выводятся по 3 карточки, для показа дополнительных карточек нажмите кнопку `Показать еще`. Кнопка пропадет, когда статьи закончатся.

### Карточка найденной статьи

Для сохранения статьи необходимо произвести вход в систему/авторизацию. Для неавторизированного пользователя, при наведении на кнопки сохранения карточек, рядом будут всплывать подсказки о необходимости авторизации (до разрешения экрана 1024px, далее кнопки просто остаются не активными). При сохранении статьи, флаг на кнопке меняет заливку на синюю. Для удаления статьи необходимо повторно нажать на кнопку сохранения - заливка исчезнет, статья будет удалена. Оригинал статьи можно найти, кликнув на ссылку источника новости, внизу карточки.

### Блок Author и Footer

Блоки `author` и `footer` реализованы статично, без каких-либо изменяющихся элементов. В блоке `footer` находятся ссылки, ведущие на соответствующие страницы.

## Страница пользователя (user-news.html)

### Блок header

В блоке `header` показываются ссылки на текущую и главную страницы, и кнопка для выхода пользователя из системы. При выходе пользователя из системы произойдет переход на главную страницу для незарегистрированного пользователя.

### Блок user

Блок `user` содержит сообщения о количестве сохраненных пользователем статей и ключевые слова, по которым они были найдены. Ключевые слова отсортированы по популярности (в зависимости от количества статей с ними).

### Блок saved-news

Блок `saved-news` реализован аналогично блоку `results` на главной странице. Внутри блока содержится сетка с сохраненными статьями `news-container`. Функциональность карточек такая же, кроме кнопки: по клику на "корзину" производится удаление статьи. При наведении на кнопку появляется подсказка, аналогичная карточке на главной странице.

### Блок Footer

Блок `footer` реализован статично, без каких-либо изменяющихся элементов, аналогично главной странице.

### Валидация

Поля форм для регистрации и входа пользователя в систему проверяются в соответствии:
- Поле `email` на заполнение и соответствие шаблону email;
- Поля `Имя` и `Пароль` - на заполнение и количество введенных символов;
- Поле для ввода ключевого слова поиска новостей валидируется на заполнение и количество введенных символов;

Параметры валидации заданы HTML - атрибутами, считывание значений полей и показ ошибок реализован при помощи JavaScript.

### Ошибки

На страницах предполагается появление следующих ошибок, передаваемых пользователю:
- В формах регистрации, входа пользователя в систему и в строке ввода ключевого слова - ошибки валидации;
- В формах регистрации над кнопкой `Войти` (`Зарегистрироваться`) - оповещение, что пользователь уже есть, оповещение о необходимости
проверки введенных данных при приходе соответствующей ошибки с сервера, оповещение об ошибки доступа к серверу.
- Вместо блока с найденными новостями - блоки с ошибками поиска (`ничего не найдено` или `проблемы с сервером`);
- Основные ошибки, связанные с проблемами соединения при нахождении пользователя в системе (удаление карточки, сохранение карточки) реализованы при помощи всплывающих окон стандартными средствами браузера (alert).



