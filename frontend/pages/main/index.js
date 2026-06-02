import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { fetchApi } from "../../modules/fetchApi.js";
import { apiUrls } from "../../modules/apiUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('products-grid');
    }

    getHTML() {
        return `
            <div class="container">
                <div class="section-title fade-in">
                    <h2><i class="fas fa-star-of-life me-2"></i>Наши препараты</h2>
                    <p>Только сертифицированные лекарственные средства высшего качества</p>
                </div>
                <div id="products-grid" class="row g-4"></div>
            </div>
        `;
    }

    async loadProducts() {
        this.pageRoot.innerHTML = `
            <div class="text-center py-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
                <p class="mt-3">Загрузка товаров...</p>
            </div>
        `;

        try {
            const { data: products, status } = await fetchApi.get(apiUrls.getProducts());

            if (status === 200 && products) {
                this.renderProducts(products);
            } else {
                this.showError('Не удалось загрузить товары');
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.showError('Ошибка соединения с сервером. Проверьте, запущен ли бэкенд на порту 3000');
        }
    }

    renderProducts(products) {
        this.pageRoot.innerHTML = '';

        if (!products || products.length === 0) {
            this.pageRoot.innerHTML = `
                <div class="alert alert-info text-center">
                    <i class="fas fa-info-circle me-2"></i>
                    Товары временно отсутствуют
                </div>
            `;
            return;
        }

        products.forEach((product) => {
            const cardData = {
                id: product.id,
                name: product.name,
                shortDescription: product.description && product.description.length > 100
                    ? product.description.substring(0, 100) + '...'
                    : (product.description || 'Современный эффективный препарат'),
                image: product.image,
                price: product.price + " ₽"
            };

            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(cardData, this.handleProductClick.bind(this));
        });
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

    handleProductClick(productId) {
        const productPage = new ProductPage(this.parent, productId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.loadProducts();
    }
}
