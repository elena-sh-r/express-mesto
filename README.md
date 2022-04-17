# Mesto. Backend
>Данный проект реализован в рамках обучения на курсе "Веб-разработчик плюс" в "Яндекс.Практикум"

## Используемые технологии
* Node.js
* Express.js


## Обзор
* Интерактивная страница с возможностью регистрации и авторизации, куда можно добавлять фотографии, удалять их и ставить лайки.

## Реализовано
* Создана папка с проектом и в ней инициализирован package.json.
* Настроен editorconfig.
* Настроен линтер.
* Инициализирован git-репозиторий в корне проекта и создан файл .gitignore.
* В корне проекта создана точка входа — файл app.js. В нём заведен express-сервер и настроен его запуск на 3000 порту по команде: `npm run start`.
* Настроен хот релоуд. Приложение с хот релоудом запускается командой: `npm run dev`.
* В app.js проект подключен к серверу MongoDB.
* Создайте схемы и модели пользователей и карточек.
* Реализовано решение авторизации.
* Созданы контроллеры и роуты для карточек и пользователя.
* Добавлены email и password к схеме пользователя&
* Доработан контроллер createUser.
* Создан контроллер login.
* Создан роут для логина и регистрации.
* Сделан мидлвэр для авторизации.
* Создан контроллер и роут для получения информации о пользователе.
* Защищены авторизацией все маршруты, кроме страницы регистрации и логина.
* Реализована централизованная обработка ошибок.
* Реализована валидация приходящих на сервер запросов.
* Реализована валидация данных на уровне схемы.
