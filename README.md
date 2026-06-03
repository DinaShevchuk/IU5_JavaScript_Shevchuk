# ЛР3. Простое веб-приложение. Верстка

Шевчук Диана ИУ5-44Б

## **Содержание**

- [Цель работы](#Цель)
- [Тема](#Тема)
- [Сайт для вдохновения](#Сайт)
- [Основные принцыпы работы](#Основные-принцыпы-работы)
- [Дополнительные задания](#Дополнительные-задания)
- [План](#План-выполнения-работы)

## **Цель** данной лабораторной работы  - знакомство с node, npm, написание простого приложения на JavaScript.
В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## **Тема:** Производство лекарств из готовых веществ.

## **Сайт** для вдохновения: https://endopharm.ru/

## **Основные принцыпы работы** 
```
├── pages/              # страницы
│   ├── main/index.js   # главная страница
│   └── product/index.js # страница товара
├── components/         # компоненты
│   ├── button/index.js
│   ├── product-card/index.js
│   ├── product/index.js
│   └── back-button/index.js
├── index.html          # точка входа (с <div id="root">)
└── main.js             # корневой скрипт
```
Главное: страницы и компоненты — отдельные классы; страница рендерит себя сама и создаёт компоненты; компоненты принимают parent (куда вставлять), data (что показывать) и listener (что делать при клике).
Задание:
Сверстать главную страницу с карточками, страницу подробного просмотра, добавить кнопки добавления и удаления карточек, а также кнопку возврата на главную страницу в хедере.

## **Дополнительные задания**

1. добаление кнопок с добавлением и удалением карточек

```pages/main/index.js
<button type="button" class="btn btn-success" id="submit-product-btn">
    <i class="fas fa-save me-2"></i>Добавить препарат
</button>
```
```
setupAddButton() {
    const addBtn = document.getElementById('add-product-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => this.openAddModal());
    }

    const submitBtn = document.getElementById('submit-product-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', async () => {
            const productData = {
                name: document.getElementById('product-name').value,
                price: document.getElementById('product-price').value,
                image: document.getElementById('product-image').value,
                description: document.getElementById('product-description').value,
                form: document.getElementById('product-form').value,
                dosage: document.getElementById('product-dosage').value,
                contraindications: document.getElementById('product-contraindications').value
            };

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Добавление...';

            const result = await this.addProduct(productData);

            if (result.success) {
                const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
                modal.hide();
                this.showNotification('Товар успешно добавлен!', 'success');
            } else {
                alert('Ошибка: ' + (result.error || 'Не удалось добавить товар'));
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Добавить препарат';
        });
    }
}

setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => this.searchProducts());
    }

    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => this.clearSearch());
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchProducts();
            }
        });
    }
}

clearSearch() {
    document.getElementById('search-input').value = '';
    document.getElementById('search-field').value = 'name';
    this.loadProducts();
}

async searchProducts() {
    const searchInput = document.getElementById('search-input').value;
    const searchField = document.getElementById('search-field').value;

    console.log('Поиск:', searchInput, 'Поле:', searchField);

    if (!searchInput.trim()) {
        this.loadProducts();
        return;
    }

    this.pageRoot.innerHTML = `
        <div class="text-center py-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p class="mt-3">Поиск...</p>
        </div>
    `;

    try {
        let url;

        // В зависимости от выбранного поля, используем разные URL
        switch (searchField) {
            case 'name':
                url = apiUrls.getProductsByName(searchInput);
                break;
            case 'price':
                url = apiUrls.getProductsByPrice(searchInput);
                break;
            case 'form':
                url = apiUrls.getProductsByForm(searchInput);
                break;
            case 'description':
                url = apiUrls.getProductsByDescription(searchInput);
                break;
            default:
                url = apiUrls.getProductsByName(searchInput);
        }

        console.log('URL запроса:', url);

        const response = await fetch(url);
        const products = await response.json();

        this.renderProducts(products);

        if (products.length === 0) {
            this.pageRoot.innerHTML = `
                <div class="alert alert-info text-center py-5">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h5>Ничего не найдено</h5>
                    <p>По запросу "${searchInput}" в поле "${searchField}" ничего не найдено</p>
                    <button class="btn btn-primary mt-2" id="clear-search-btn">
                        <i class="fas fa-times me-2"></i>Сбросить поиск
                    </button>
                </div>
            `;

            const clearBtn = document.getElementById('clear-search-btn');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => this.clearSearch());
            }
        }
    } catch (error) {
        console.error('Ошибка поиска:', error);
        this.showError('Ошибка при поиске');
    }
}

showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

showError(message) {
    this.pageRoot.innerHTML = `
        <div class="alert alert-danger text-center py-4">
            <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
            <h5>Ошибка загрузки</h5>
            <p>${message}</p>
            <button class="btn btn-primary mt-2" id="retry-btn">
                <i class="fas fa-sync-alt me-2"></i>Повторить попытку
            </button>
        </div>
    `;

    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => this.loadProducts());
    }
}
```

## План выполнения работы
1. Инструменты для работы
2. Что такое node, npm и package.json
3. Как работать с html в JS
4. Инициализация проекта
5. Создание главной страницы, подключение bootstrap
6. Простая кнопка на JavaScript
7. Структурирование проекта
8. Верстка главной страницы
9. Верстка страницы продукта
