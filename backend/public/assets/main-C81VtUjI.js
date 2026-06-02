(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();class l{constructor(t){this.parent=t}getHTML(t){const e=t.image&&t.image.trim()!==""?t.image:"https://via.placeholder.com/300x200?text=МедФарм";return`
            <div class="col-lg-4 col-md-6 mb-4 fade-in">
                <div class="product-card card h-100 shadow-sm position-relative">
                    <button class="btn-delete-product" data-id="${t.id}"
                            style="position: absolute; top: 10px; right: 10px; z-index: 10;
                                   background: #dc3545; color: white; border: none;
                                   border-radius: 50%; width: 35px; height: 35px;
                                   display: flex; align-items: center; justify-content: center;
                                   cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-trash-alt"></i>
                    </button>

                    <div class="product-image-wrapper position-relative">
                        <img class="card-img-top product-image"
                             src="${e}"
                             alt="${t.name}"
                             style="height: 200px; object-fit: cover;">
                        <span class="product-badge position-absolute top-0 start-0 m-2 badge bg-success">
                            <i class="fas fa-check-circle me-1"></i>В наличии
                        </span>
                    </div>

                    <div class="card-body">
                        <h5 class="card-title product-title">${t.name||"Без названия"}</h5>
                        <p class="card-text product-description text-muted small">
                            ${t.shortDescription||"Описание отсутствует"}
                        </p>
                        <div class="product-footer d-flex justify-content-between align-items-center mt-3">
                            <div class="product-price">
                                <strong class="h5 text-primary">${t.price||"0"}</strong>
                            </div>
                            <button class="btn btn-sm btn-outline-primary btn-detail" data-id="${t.id}">
                                <i class="fas fa-info-circle me-1"></i>Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(t,e,s){const r=document.querySelector(`button.btn-detail[data-id="${t.id}"]`);r&&r.addEventListener("click",()=>e(t.id));const a=document.querySelector(`button.btn-delete-product[data-id="${t.id}"]`);a&&(a.addEventListener("click",o=>{o.stopPropagation(),s(t.id)}),a.addEventListener("mouseenter",()=>{a.style.background="#c82333",a.style.transform="scale(1.1)"}),a.addEventListener("mouseleave",()=>{a.style.background="#dc3545",a.style.transform="scale(1)"}))}render(t,e,s){const r=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",r),this.addListeners(t,e,s)}}class u{async _request(t,e={}){try{const s=await fetch(t,e);return s.status===204?{data:null,status:s.status}:{data:await s.json(),status:s.status}}catch(s){throw console.error("Fetch error:",s),s}}async get(t){return this._request(t,{method:"GET",headers:{"Content-Type":"application/json"}})}async post(t,e){return this._request(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async patch(t,e){return this._request(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}async delete(t){return this._request(t,{method:"DELETE",headers:{"Content-Type":"application/json"}})}}const n=new u;class m{constructor(){this.baseUrl=""}getProducts(){return"/api/products"}getProductById(t){return`/api/products/${t}`}createProduct(){return"/api/products"}updateProduct(t){return`/api/products/${t}`}deleteProduct(t){return`/api/products/${t}`}}const d=new m;class p{constructor(t,e){this.parent=t,this.productId=e}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
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
        `}async loadProduct(){try{const{data:t,status:e}=await n.get(d.getProductById(this.productId));e===200&&t?this.renderProduct(t):e===404?this.showNotFound():this.showError("Не удалось загрузить информацию о товаре")}catch(t){console.error("Ошибка загрузки:",t),this.showError("Ошибка соединения с сервером")}}renderProduct(t){const e=document.getElementById("product-detail");if(!e)return;const s=t.image&&t.image.trim()!==""?t.image:"https://via.placeholder.com/500x400?text=МедФарм";e.innerHTML=`
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${s}"
                         class="detail-image img-fluid rounded"
                         alt="${t.name}"
                         style="width: 100%; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <div class="detail-body p-4">
                        <button class="btn btn-outline-primary mb-4" id="back-button">
                            <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                        </button>
                        <h2 class="detail-title mb-3">${t.name||"Название не указано"}</h2>
                        <div class="detail-price mb-4">
                            <h3 class="text-primary">
                                <i class="fas fa-ruble-sign me-1"></i>
                                ${t.price||"0"} руб.
                            </h3>
                        </div>
                        <div class="detail-description mb-4">
                            <h5><i class="fas fa-info-circle me-2"></i>Описание:</h5>
                            <p>${t.description||"Описание отсутствует"}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-pills me-2"></i> Форма выпуска:</h6>
                            <p>${t.form||"Не указано"}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-clock me-2"></i> Дозировка:</h6>
                            <p>${t.dosage||"Не указано"}</p>
                        </div>
                        <div class="info-section">
                            <h6><i class="fas fa-exclamation-triangle me-2"></i> Противопоказания:</h6>
                            <p class="text-muted">${t.contraindications||"Не указано"}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;const r=document.getElementById("back-button");r&&r.addEventListener("click",()=>{new c(this.parent).render()})}showNotFound(){const t=document.getElementById("product-detail");if(t){t.innerHTML=`
                <div class="alert alert-warning text-center py-5">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h4>Товар не найден</h4>
                    <p>Товар с ID ${this.productId} не существует в базе данных</p>
                    <button class="btn btn-primary mt-3" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;const e=document.getElementById("back-button-error");e&&e.addEventListener("click",()=>{new c(this.parent).render()})}}showError(t){const e=document.getElementById("product-detail");if(e){e.innerHTML=`
                <div class="alert alert-danger text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <h4>Ошибка загрузки</h4>
                    <p>${t}</p>
                    <button class="btn btn-primary mt-3" id="retry-btn">
                        <i class="fas fa-sync-alt me-2"></i>Повторить попытку
                    </button>
                    <button class="btn btn-outline-secondary mt-3 ms-2" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;const s=document.getElementById("retry-btn");s&&s.addEventListener("click",()=>this.loadProduct());const r=document.getElementById("back-button-error");r&&r.addEventListener("click",()=>{new c(this.parent).render()})}}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.loadProduct()}}class c{constructor(t){this.parent=t,this.products=[]}get pageRoot(){return document.getElementById("products-grid")}getHTML(){return`
            <div class="container">
                <div class="section-title fade-in d-flex justify-content-between align-items-center">
                    <div>
                        <h2><i class="fas fa-star-of-life me-2"></i>Наши препараты</h2>
                        <p>Только сертифицированные лекарственные средства высшего качества</p>
                    </div>
                    <button id="add-product-btn" class="btn btn-success btn-lg">
                        <i class="fas fa-plus me-2"></i>Добавить препарат
                    </button>
                </div>
                <div id="products-grid" class="row g-4"></div>
            </div>

            <div class="modal fade" id="addProductModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">
                                <i class="fas fa-plus me-2"></i>Добавление нового препарата
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="add-product-form">
                                <div class="mb-3">
                                    <label for="product-name" class="form-label">Название *</label>
                                    <input type="text" class="form-control" id="product-name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product-price" class="form-label">Цена (руб) *</label>
                                    <input type="number" class="form-control" id="product-price" required>
                                </div>
                                <div class="mb-3">
                                    <label for="product-image" class="form-label">URL изображения</label>
                                    <input type="url" class="form-control" id="product-image"
                                           placeholder="https://example.com/image.jpg (необязательно)">
                                    <small class="text-muted">Если не указать, будет установлено изображение-заглушка</small>
                                </div>
                                <div class="mb-3">
                                    <label for="product-description" class="form-label">Описание</label>
                                    <textarea class="form-control" id="product-description" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="product-form" class="form-label">Форма выпуска</label>
                                    <input type="text" class="form-control" id="product-form"
                                           placeholder="Таблетки, капсулы и т.д.">
                                </div>
                                <div class="mb-3">
                                    <label for="product-dosage" class="form-label">Дозировка</label>
                                    <input type="text" class="form-control" id="product-dosage"
                                           placeholder="500 мг">
                                </div>
                                <div class="mb-3">
                                    <label for="product-contraindications" class="form-label">Противопоказания</label>
                                    <textarea class="form-control" id="product-contraindications" rows="2"></textarea>
                                </div>
                                <div class="alert alert-info">
                                    <i class="fas fa-info-circle me-2"></i>
                                    Поля, отмеченные *, обязательны для заполнения
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                <i class="fas fa-times me-2"></i>Отмена
                            </button>
                            <button type="button" class="btn btn-success" id="submit-product-btn">
                                <i class="fas fa-save me-2"></i>Добавить препарат
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `}async loadProducts(){this.pageRoot.innerHTML=`
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p class="mt-3">Загрузка товаров...</p>
            </div>
        `;try{const{data:t,status:e}=await n.get(d.getProducts());e===200&&t?(this.products=t,this.renderProducts(t)):this.showError("Не удалось загрузить товары")}catch(t){console.error("Ошибка загрузки:",t),this.showError("Ошибка соединения с сервером")}}renderProducts(t){if(this.pageRoot.innerHTML="",!t||t.length===0){this.pageRoot.innerHTML=`
                <div class="alert alert-info text-center py-5">
                    <i class="fas fa-box-open fa-3x mb-3"></i>
                    <h5>Нет доступных товаров</h5>
                    <p>Нажмите кнопку "Добавить препарат", чтобы создать первый товар</p>
                </div>
            `;return}t.forEach(e=>{const s={id:e.id,name:e.name,shortDescription:e.description&&e.description.length>100?e.description.substring(0,100)+"...":e.description||"Современный эффективный препарат",image:e.image,price:e.price+" ₽"};new l(this.pageRoot).render(s,this.handleProductClick.bind(this),this.handleDeleteProduct.bind(this))})}async addProduct(t){if(!t.name||!t.price)return alert("Пожалуйста, заполните обязательные поля: Название и Цена"),{success:!1,error:"Не заполнены обязательные поля"};t.image||(t.image="https://via.placeholder.com/300x200?text=МедФарм");try{const{data:e,status:s}=await n.post(d.createProduct(),t);return s===201&&e?(await this.loadProducts(),{success:!0,product:e}):{success:!1,error:"Не удалось создать товар"}}catch(e){return console.error("Ошибка создания:",e),{success:!1,error:e.message}}}async deleteProduct(t){if(!confirm("Вы уверены, что хотите удалить этот препарат?"))return!1;try{const{status:s}=await n.delete(d.deleteProduct(t));return s===204?(await this.loadProducts(),!0):(alert("Не удалось удалить товар"),!1)}catch(s){return console.error("Ошибка удаления:",s),alert("Ошибка при удалении товара"),!1}}openAddModal(){document.getElementById("add-product-form").reset(),new bootstrap.Modal(document.getElementById("addProductModal")).show()}setupAddButton(){const t=document.getElementById("add-product-btn");t&&t.addEventListener("click",()=>this.openAddModal());const e=document.getElementById("submit-product-btn");e&&e.addEventListener("click",async()=>{const s={name:document.getElementById("product-name").value,price:document.getElementById("product-price").value,image:document.getElementById("product-image").value,description:document.getElementById("product-description").value,form:document.getElementById("product-form").value,dosage:document.getElementById("product-dosage").value,contraindications:document.getElementById("product-contraindications").value};e.disabled=!0,e.innerHTML='<i class="fas fa-spinner fa-spin me-2"></i>Добавление...';const r=await this.addProduct(s);r.success?(bootstrap.Modal.getInstance(document.getElementById("addProductModal")).hide(),this.showNotification("Товар успешно добавлен!","success")):alert("Ошибка: "+(r.error||"Не удалось добавить товар")),e.disabled=!1,e.innerHTML='<i class="fas fa-save me-2"></i>Добавить препарат'})}showNotification(t,e="info"){const s=document.createElement("div");s.className=`alert alert-${e} alert-dismissible fade show position-fixed top-0 end-0 m-3`,s.style.zIndex="9999",s.style.minWidth="300px",s.innerHTML=`
            <i class="fas ${e==="success"?"fa-check-circle":"fa-info-circle"} me-2"></i>
            ${t}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `,document.body.appendChild(s),setTimeout(()=>{s.remove()},3e3)}showError(t){this.pageRoot.innerHTML=`
            <div class="alert alert-danger text-center py-4">
                <i class="fas fa-exclamation-triangle fa-2x mb-3"></i>
                <h5>Ошибка загрузки</h5>
                <p>${t}</p>
                <button class="btn btn-primary mt-2" id="retry-btn">
                    <i class="fas fa-sync-alt me-2"></i>Повторить попытку
                </button>
            </div>
        `;const e=document.getElementById("retry-btn");e&&e.addEventListener("click",()=>this.loadProducts())}handleProductClick(t){new p(this.parent,t).render()}async handleDeleteProduct(t){await this.deleteProduct(t)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("beforeend",this.getHTML()),this.setupAddButton(),this.loadProducts()}}document.addEventListener("DOMContentLoaded",()=>{const i=document.getElementById("root");i?new c(i).render():console.error("Элемент #root не найден")});
