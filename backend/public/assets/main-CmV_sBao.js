(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="col-lg-4 col-md-6 mb-4 fade-in">
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img class="product-image" src="${e.image}" alt="${e.name}">
                        <span class="product-badge">
                            <i class="fas fa-check-circle me-1"></i>В наличии
                        </span>
                    </div>
                    <div class="product-body">
                        <h5 class="product-title">${e.name}</h5>
                        <p class="product-description">${e.shortDescription||`Современный эффективный препарат для вашего здоровья`}</p>
                        <div class="product-footer">
                            <div class="product-price">
                                ${e.price}
                                <small> руб.</small>
                            </div>
                            <button class="btn-detail" data-id="${e.id}">
                                <i class="fas fa-info-circle me-1"></i>Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(e,t){let n=document.querySelector(`button[data-id="${e.id}"]`);n&&n.addEventListener(`click`,()=>t(e.id))}render(e,t){let n=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,n),this.addListeners(e,t)}},t=new class{async _request(e,t={}){try{let n=await fetch(e,t);if(!n.ok)throw Error(`HTTP error! status: ${n.status}`);return n.status===204?null:{data:await n.json(),status:n.status}}catch(e){throw console.error(`Fetch error:`,e),e}}async get(e){return this._request(e,{method:`GET`,headers:{"Content-Type":`application/json`}})}async post(e,t){return this._request(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})}async patch(e,t){return this._request(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)})}async delete(e){return this._request(e,{method:`DELETE`,headers:{"Content-Type":`application/json`}})}},n=new class{constructor(){this.baseUrl=`http://localhost:3000`}getProducts(){return`${this.baseUrl}/api/products`}getProductById(e){return`${this.baseUrl}/api/products/${e}`}createProduct(){return`${this.baseUrl}/api/products`}updateProduct(e){return`${this.baseUrl}/api/products/${e}`}deleteProduct(e){return`${this.baseUrl}/api/products/${e}`}},r=class{constructor(e,t){this.parent=e,this.productId=t}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
            <div class="container">
                <div id="product-detail" class="detail-card">
                    <div class="text-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Загрузка...</span>
                        </div>
                        <p class="mt-3">Загрузка информации о товаре...</p>
                    </div>
                </div>
            </div>
        `}async loadProduct(){try{let{data:e,status:r}=await t.get(n.getProductById(this.productId));r===200&&e?this.renderProduct(e):r===404?this.showNotFound():this.showError(`Не удалось загрузить информацию о товаре`)}catch(e){console.error(`Ошибка загрузки:`,e),this.showError(`Ошибка соединения с сервером`)}}renderProduct(e){let t=document.getElementById(`product-detail`);if(!t)return;t.innerHTML=`
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${e.image||`https://via.placeholder.com/500`}"
                         class="detail-image img-fluid rounded"
                         alt="${e.name}"
                         style="width: 100%; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <div class="detail-body p-4">
                        <button class="btn btn-outline-primary mb-4" id="back-button">
                            <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                        </button>
                        <h2 class="detail-title mb-3">${e.name||`Название не указано`}</h2>
                        <div class="detail-price mb-4">
                            <h3 class="text-primary">
                                <i class="fas fa-ruble-sign me-1"></i>
                                ${e.price||`0`} руб.
                            </h3>
                        </div>
                        <div class="detail-description mb-4">
                            <h5><i class="fas fa-info-circle me-2"></i>Описание:</h5>
                            <p>${e.description||`Описание отсутствует`}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-pills me-2"></i> Форма выпуска:</h6>
                            <p>${e.form||`Не указано`}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-clock me-2"></i> Дозировка:</h6>
                            <p>${e.dosage||`Не указано`}</p>
                        </div>
                        <div class="info-section">
                            <h6><i class="fas fa-exclamation-triangle me-2"></i> Противопоказания:</h6>
                            <p class="text-muted">${e.contraindications||`Не указано`}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;let n=document.getElementById(`back-button`);n&&n.addEventListener(`click`,()=>{new i(this.parent).render()})}showNotFound(){let e=document.getElementById(`product-detail`);if(e){e.innerHTML=`
                <div class="alert alert-warning text-center py-5">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h4>Товар не найден</h4>
                    <p>Товар с ID ${this.productId} не существует в базе данных</p>
                    <button class="btn btn-primary mt-3" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;let t=document.getElementById(`back-button-error`);t&&t.addEventListener(`click`,()=>{new i(this.parent).render()})}}showError(e){let t=document.getElementById(`product-detail`);if(t){t.innerHTML=`
                <div class="alert alert-danger text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <h4>Ошибка загрузки</h4>
                    <p>${e}</p>
                    <button class="btn btn-primary mt-3" id="retry-btn">
                        <i class="fas fa-sync-alt me-2"></i>Повторить попытку
                    </button>
                    <button class="btn btn-outline-secondary mt-3 ms-2" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;let n=document.getElementById(`retry-btn`);n&&n.addEventListener(`click`,()=>this.loadProduct());let r=document.getElementById(`back-button-error`);r&&r.addEventListener(`click`,()=>{new i(this.parent).render()})}}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.loadProduct()}},i=class{constructor(e){this.parent=e}get pageRoot(){return document.getElementById(`products-grid`)}getHTML(){return`
            <div class="container">
                <div class="section-title fade-in">
                    <h2><i class="fas fa-star-of-life me-2"></i>Наши препараты</h2>
                    <p>Только сертифицированные лекарственные средства высшего качества</p>
                </div>
                <div id="products-grid" class="row g-4"></div>
            </div>
        `}async loadProducts(){this.pageRoot.innerHTML=`
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p class="mt-3">Загрузка товаров...</p>
            </div>
        `;try{let{data:e,status:r}=await t.get(n.getProducts());r===200&&e?this.renderProducts(e):this.showError(`Не удалось загрузить товары`)}catch(e){console.error(`Ошибка загрузки:`,e),this.showError(`Ошибка соединения с сервером. Проверьте, запущен ли бэкенд на порту 3000`)}}renderProducts(t){if(this.pageRoot.innerHTML=``,!t||t.length===0){this.pageRoot.innerHTML=`
                <div class="alert alert-info text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    Товары временно отсутствуют
                </div>
            `;return}t.forEach(t=>{let n={id:t.id,name:t.name,shortDescription:t.description&&t.description.length>100?t.description.substring(0,100)+`...`:t.description||`Современный эффективный препарат`,image:t.image,price:t.price+` ₽`};new e(this.pageRoot).render(n,this.handleProductClick.bind(this))})}showError(e){this.pageRoot.innerHTML=`
            <div class="alert alert-danger text-center py-4">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <h5>Ошибка загрузки</h5>
                <p>${e}</p>
                <button class="btn btn-primary mt-2" id="retry-btn">
                    <i class="fas fa-sync-alt me-2"></i>Повторить попытку
                </button>
            </div>
        `;let t=document.getElementById(`retry-btn`);t&&t.addEventListener(`click`,()=>this.loadProducts())}handleProductClick(e){new r(this.parent,e).render()}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.loadProducts()}};document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`root`);e?new i(e).render():console.error(`Элемент #root не найден`)});