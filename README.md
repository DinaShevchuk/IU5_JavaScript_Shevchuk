# ЛР6. Знакомство с Promise и fetch, сборка клиентской части

Шевчук Диана ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Основные принцыпы работы](#Основные-принцыпы-работы)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** 
Первая часть данной лабораторной работы заключается в изменении механизма взаимодействия с внешним API: в прошлой лабораторной работе использовался XMLHttpRequest, в этой - современный метод fetch. В ходе выполнения работы предстоит познакомиться с кратким полезным теоретическим материалом, кодом реализации простого взаимодействия с внешним API, получением данных и выводом их в интерфейс пользователя, и выполнить задания по варианту.

Вторая часть лабораторной работы заключается в сборке клиентской части приложения: необходимо "сбилдить" клиентскую часть (ЛР №3) с помощью системы сборки, а также добавить в серверную часть (ЛР №4) возможность раздачи клиентской части в качестве статики во избежание проблем с CORS.

## **Тема:** Производство лекарств из готовых веществ.

## **Сайт** для вдохновения: https://endopharm.ru/

## **Основные принцыпы работы** 
Данные теперь приходят с бэкенда через API, а не захардкожены
Все CRUD операции (создание, чтение, обновление, удаление) → через AJAX-запросы
Для отслеживания запросов → вкладка Network в DevTools

``` клиентская часть
frontend/
├── node_modules/
├── .gitignore
├── package-lock.json
├── package.json
├── index.html
├── main.js
│
├── pages/                  # страницы
│   ├── main/index.js       # использует ajax + stockUrls
│   └── product/index.js
│
components/             # компоненты
│   ├── button/
│   │   └── index.js
│   ├── product-card/
│   │   └── index.js
│   ├── product/
│   │   └── index.js
│   └── back-button/
│       └── index.js
└── modules/                # НОВЫЙ СЛОЙ для работы с API
    ├── ajax.js             # класс Ajax (GET, POST, PATCH, DELETE)
    └── stockUrls.js        # класс StockUrls (эндпоинты API)
```
Замена коллбеков на промисы, запросы fetch. Собрать файлы фронтенда через bundler, развернуть их на сервере c API. Ветка по 6ой лабораторной остается только с файлами исходного кода, а собранный bundle необходимо добавить в ветку по 4ой лабораторной

## **Дополнительные задания**

1. Переделаны запросы через async, await, fetch.

```
class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (GET):', error);
            throw error;
        }
    }
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (POST):', error);
            throw error;
        }
    }
    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            return await this._handleResponse(response);
        } catch (error) {
            console.error('Fetch error (DELETE):', error);
            throw error;
        }
    }
    async _handleResponse(response) {
        const data = await response.json().catch(() => null);
        return { data, status: response.status };
    }
}

export const ajax = new Ajax();
```
```
async getData() {
    try {
        const { data } = await ajax.get(stockUrls.getStocks());
        this.cardsData2 = data;
        this.renderData();
    } catch (e) {
        console.error("Ошибка при получении данных:", e);
    }
}
```

## План выполнения работы
1. Введение в Promise.
2. Использование Promise.
3. Что такое async await в JS
4. Пояснение про fetch и пример использования.
5. Сборка клиентской части через Vite.
6. Раздача фронтенда в качестве статики
   
