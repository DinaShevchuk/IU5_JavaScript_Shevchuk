# ЛР5. Добаление AJAX запросов к API.

Шевчук Диана ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Основные принцыпы работы](#Основные-принцыпы-работы)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** 
данной лабораторной работы - взаимодействие с внешним API через XMLHttpRequest. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого взаимодействия с внешним API, получение данных и вывод их в интерфейс пользователя, и затем выполнить задания по варианту.
## **Тема:** Производство лекарств из готовых веществ.

## **Сайт** для вдохновения: https://endopharm.ru/

## **Основные принцыпы работы** 
Данные теперь приходят с бэкенда через API, а не захардкожены
Все CRUD операции (создание, чтение, обновление, удаление) → через AJAX-запросы
Для отслеживания запросов → вкладка Network в DevTools

```
├── pages/          # страницы
├── components/     # компоненты
├── modules/        # НОВЫЙ СЛОЙ для работы с API
│   ├── ajax.js     # XHR-запросы
│   └── stockUrls.js # эндпоинты API
├── index.html
└── main.js
```
В этой лабораторной работе клиентская часть подключается к серверу через HTTP-запросы, а сервер отвечает JSON-данными.

express используется для создания API и маршрутов;
cors нужен для разрешения запросов с другого адреса;
fileService читает и записывает данные в JSON;
stocksService хранит бизнес-логику работы с карточками;
stocksController проверяет входные данные и формирует ответы со статусами.

## **Дополнительные задания**

1. изменение в карточках
```
// backend/src/services/fileService.js
const fs = require('fs');

const readData = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Ошибка чтения файла:', err);
        return [];
    }
};

const writeData = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Ошибка записи файла:', err);
    }
};

module.exports = { readData, writeData };
```
```
// backend/src/services/productsService.js
const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = () => {
    return fileService.readData(dataFilePath);
};

const findOne = (id) => {
    const products = fileService.readData(dataFilePath);
    return products.find(product => product.id === parseInt(id));
};

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

const findByForm = (form) => {
    const products = fileService.readData(dataFilePath);
    const query = form.toString().toLowerCase();

    return products.filter(product => {
        return product.form && product.form.toLowerCase().includes(query);
    });
};

const findByDescription = (description) => {
    const products = fileService.readData(dataFilePath);
    const query = description.toString().toLowerCase();

    return products.filter(product => {
        return product.description && product.description.toLowerCase().includes(query);
    });
};

const create = (productData) => {
    const products = fileService.readData(dataFilePath);

    const newId = products.length > 0
        ? Math.max(...products.map(p => p.id)) + 1
        : 1;

    const newProduct = {
        id: newId,
        name: productData.name || 'Без названия',
        price: productData.price ? productData.price.toString() : '0',
        image: productData.image || 'https://via.placeholder.com/300x200?text=МедФарм',
        description: productData.description || '',
        form: productData.form || '',
        dosage: productData.dosage || '',
        contraindications: productData.contraindications || ''
    };

    products.push(newProduct);
    fileService.writeData(dataFilePath, products);

    return newProduct;
};

const update = (id, productData) => {
    const products = fileService.readData(dataFilePath);
    const index = products.findIndex(p => p.id === parseInt(id));

    if (index === -1) return null;

    products[index] = { ...products[index], ...productData, id: products[index].id };
    fileService.writeData(dataFilePath, products);

    return products[index];
};

const remove = (id) => {
    const products = fileService.readData(dataFilePath);
    const filteredProducts = products.filter(p => p.id !== parseInt(id));

    if (filteredProducts.length === products.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredProducts);
    return true;
};

module.exports = {
    init,
    findAll,
    findOne,
    findByName,
    findByPrice,
    findByForm,
    findByDescription,
    create,
    update,
    remove
};
```

## План выполнения работы
1. Инструменты для работы.
2. Что такое XMLHttpRequest.
3. Работа с API.
4. API главной страницы с карточками.
5. API страницы карточки.
6. Дополнительные материалы
