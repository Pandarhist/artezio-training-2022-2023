# Artezio Office Plan [Server]

Серверная часть приложения представляет собой REST API для обработки данных в формате JSON.


## Требования

* [Node.js](https://nodejs.org/ru/) v.18 и выше. Желательно устанавливать последнюю LST версию.
* npm v.9 и старше (поставляется вместе с Node.js)
* [MySQL Server 8](https://dev.mysql.com/downloads/mysql/)


## Технологии

* [express](https://expressjs.com/ru/) - веб-фреймворк для обработки поступающих HTTP запросов и формирования ответов.
* [body-parser](http://expressjs.com/en/resources/middleware/body-parser.html) - промежуточный обработчик (middleware)
  для фреймворка _express_ по обработки тела HTTP запросов в формате JSON.
* [cors](https://github.com/expressjs/cors#readme) - промежуточный обработчик (middleware) для фреймворка _express_
  для разрешения [CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS) конфликтов.
* [mysql](https://github.com/mysqljs/mysql#readme) - драйвер для подключения и работы
  с СУБД MySQL из Node.js приложений.


## Предустановка

Перед началом разработки и работой с исходным кодом необходимо выполнить установку всех зависимостей.

Выполнить следующую команду в корне подпроекта:

```
npm install
```


## Разработка

Запустить `express`-сервер можно следующей командой:

```
npm start
```

### Архитектора приложения

Исходный код подпроекта архитектурно можно разбить на 3 слоя: _Routing_, _Service_, _DAO_.

#### Routing
  
Слой маршрутизации и обработки входящих HTTP-запросах.

**Знает о:** URL-адресах и навигации, формате данных HTTP-запросов и HTTP-ответов,
валидации входящих запросов.

Обращается к сервисному слою для обработки полученных данных и/или получении результата.

**Не знает о** слое DAO или любом другом источнике данных приложения.
  
Ссылки: [Express Routing](https://expressjs.com/en/guide/routing.html) и 
[express.Router()](https://expressjs.com/en/4x/api.html#router)

#### Service
  
Сервисный слой. Слой с бизнес-логикой приложения.

Содержит всю функциональность по обработке данных приложения.

**Знает о** DAO-слое, к которому обращается для выполнения манипуляций с данными в источнике данных.
А также может знать о других элементах сервисного слоя, которым может делегировать обработку
связанных сущностей.

**Не знает о:** HTTP-слое или любом другом возможном инициаторе вызова сервиса. 
Не зависит от реализации источника данных (СУБД и SQL), с которым работает DAO-слой. 

#### DAO

Слой с объектами доступа к данным (_Data Access Object_).

Формирует SQL-запросы к СУБД, а также возвращает полученные данные из ответов на SQL-запросы. 

**Знает о** конкретной реализации СУБД и используемом диалекте SQL.

**Не знает о** других слоях приложения.


### Файловая структура

Файлы исходный кода должна создавать и добавляться согласно следующей структуре: 

```text
server
├─ sql                       - директория с SQL-скриптами: создание БД и таблиц, наполнение начальными данными т.п.
├─ src
│  ├─ dao                    - директория DAO-слоя приложения
│  │  ├─ employee.dao.js     - файл для DAO сущности "Employee"
│  │  └─ ...
│  ├─ routes/                - директория Routing-слоя приложения
│  │  ├─ employee.routes.js  - файл для обработки HTTP-запросов к сущности "Employee"
│  │  └─ ...
│  ├─ services/              - директория сервисного слоя приложения
│  │  ├─ employee.service.js - файл для бизнес-логикой для сущности "Employee"
│  │  └─ ...
│  ├─ app.js                 - начальная точка входа в приложение.
│  └─ config.js              - файл с параметрами конфигурации для работы с внешним окружением.
├─ package.json
└─ README.md
```