import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { fetchApi } from "../../modules/fetchApi.js";
import { apiUrls } from "../../modules/apiUrls.js";

export class ProductPage {
    constructor(parent, productId) {
        this.parent = parent;
        this.productId = productId;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
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
        `;
    }

    async loadProduct() {
        try {
            const { data: product, status } = await fetchApi.get(
                apiUrls.getProductById(this.productId)
            );

            if (status === 200 && product) {
                this.renderProduct(product);
            } else if (status === 404) {
                this.showNotFound();
            } else {
                this.showError('Не удалось загрузить информацию о товаре');
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.showError('Ошибка соединения с сервером');
        }
    }

    renderProduct(product) {
        const detailDiv = document.getElementById('product-detail');

        if (!detailDiv) return;

        const imageUrl = product.image && product.image.trim() !== ''
            ? product.image
            : 'https://via.placeholder.com/500x400?text=МедФарм';

        detailDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${imageUrl}"
                         class="detail-image img-fluid rounded"
                         alt="${product.name}"
                         style="width: 100%; object-fit: cover;">
                </div>
                <div class="col-md-6">
                    <div class="detail-body p-4">
                        <button class="btn btn-outline-primary mb-4" id="back-button">
                            <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                        </button>
                        <h2 class="detail-title mb-3">${product.name || 'Название не указано'}</h2>
                        <div class="detail-price mb-4">
                            <h3 class="text-primary">
                                <i class="fas fa-ruble-sign me-1"></i>
                                ${product.price || '0'} руб.
                            </h3>
                        </div>
                        <div class="detail-description mb-4">
                            <h5><i class="fas fa-info-circle me-2"></i>Описание:</h5>
                            <p>${product.description || 'Описание отсутствует'}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-pills me-2"></i> Форма выпуска:</h6>
                            <p>${product.form || 'Не указано'}</p>
                        </div>
                        <div class="info-section mb-3">
                            <h6><i class="fas fa-clock me-2"></i> Дозировка:</h6>
                            <p>${product.dosage || 'Не указано'}</p>
                        </div>
                        <div class="info-section">
                            <h6><i class="fas fa-exclamation-triangle me-2"></i> Противопоказания:</h6>
                            <p class="text-muted">${product.contraindications || 'Не указано'}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const backButton = document.getElementById('back-button');
        if (backButton) {
            backButton.addEventListener('click', () => {
                const mainPage = new MainPage(this.parent);
                mainPage.render();
            });
        }
    }

    showNotFound() {
        const detailDiv = document.getElementById('product-detail');
        if (detailDiv) {
            detailDiv.innerHTML = `
                <div class="alert alert-warning text-center py-5">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h4>Товар не найден</h4>
                    <p>Товар с ID ${this.productId} не существует в базе данных</p>
                    <button class="btn btn-primary mt-3" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;

            const backButton = document.getElementById('back-button-error');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                });
            }
        }
    }

    showError(message) {
        const detailDiv = document.getElementById('product-detail');
        if (detailDiv) {
            detailDiv.innerHTML = `
                <div class="alert alert-danger text-center py-5">
                    <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                    <h4>Ошибка загрузки</h4>
                    <p>${message}</p>
                    <button class="btn btn-primary mt-3" id="retry-btn">
                        <i class="fas fa-sync-alt me-2"></i>Повторить попытку
                    </button>
                    <button class="btn btn-outline-secondary mt-3 ms-2" id="back-button-error">
                        <i class="fas fa-arrow-left me-2"></i>Вернуться к каталогу
                    </button>
                </div>
            `;

            const retryBtn = document.getElementById('retry-btn');
            if (retryBtn) {
                retryBtn.addEventListener('click', () => this.loadProduct());
            }

            const backButton = document.getElementById('back-button-error');
            if (backButton) {
                backButton.addEventListener('click', () => {
                    const mainPage = new MainPage(this.parent);
                    mainPage.render();
                });
            }
        }
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.loadProduct();
    }
}
