# ЛР4: Разработка REST API на Express.js

Шевчук Диана ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Основные принцыпы работы](#Основные-принцыпы-работы)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** 
Сделать собственный REST API на Node.js и Express, хранить данные в JSON-файле и проверить основные CRUD-операции через Postman или Insomnia.
## **Тема:** Производство лекарств из готовых веществ.

## **Сайт** для вдохновения: https://endopharm.ru/

## **Основные принцыпы работы** 
Что такое Express.js
Минималистичный веб-фреймворк для Node.js
Надстройка над встроенным модулем http
Упрощает: маршрутизацию, парсинг JSON, обработку ошибок

```
src/
├── index.js           # Точка входа (сервер, middleware, роуты)
├── routes/            # Маршруты (связь URL → контроллер)
├── controllers/       # Обработка запросов, статусы, валидация
├── services/          # Бизнес-логика (работа с данными)
└── data/              # Хранение (JSON-файлы)
```
Поток данных:
Request → Middleware → Router → Controller → Service → Response

GET	/stocks	все карточки
GET	/stocks?title=...	поиск по названию
GET	/stocks/:id	одна карточка
POST	/stocks	создать
PATCH	/stocks/:id	обновить
DELETE	/stocks/:id	удалить


## **Дополнительные задания**

1. изменение поиска в Postman

const findByName = (name) => {
    const products = fileService.readData(dataFilePath);
    const query = name.toString().toLowerCase();
    
    return products.filter(product => {
        return product.name && product.name.toLowerCase().includes(query);
    });
};

const findByPrice = (price) => {
    const products = fileService.readData(dataFilePath);
    const query = price.toString();
    
    return products.filter(product => {
        return product.price && product.price.toString() === query;
    });
};


const findByDescription = (description) => {
    const products = fileService.readData(dataFilePath);
    const query = description.toString().toLowerCase();
    
    return products.filter(product => {
        return product.description && product.description.toLowerCase().includes(query);
    });
};
```
```
const getAllProducts = (req, res) => {
    const { name, price, form, description } = req.query;
    
    if (name) {
        products = productsService.findByName(name);
    } else if (price) {
        products = productsService.findByPrice(price);
    } else if (form) {
        products = productsService.findByForm(form);
    } else if (description) {
        products = productsService.findByDescription(description);
    } else {
        products = productsService.findAll();
    }
    
    res.json(products);
};
```

## План выполнения работы
1. Введение в Express.js
2. Сравнение Express.js с чистым Node.js и NestJS
3. Создание проекта и базовая настройка
4. Архитектура приложения
5. Реализация REST API для карточек Stock
6. Тестирование работоспособности сервиса с помощью Postman
7. Дополнительные материалы

