import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { fetchApi } from "../../modules/fetchApi.js";
import { apiUrls } from "../../modules/apiUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.products = [];
    }

    get pageRoot() {
        return document.getElementById('products-grid');
    }

    getHTML() {
        return `
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
                this.products = products;
                this.renderProducts(products);
            } else {
                this.showError('Не удалось загрузить товары');
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            this.showError('Ошибка соединения с сервером');
        }
    }

    renderProducts(products) {
        this.pageRoot.innerHTML = '';

        if (!products || products.length === 0) {
            this.pageRoot.innerHTML = `
                <div class="alert alert-info text-center py-5">
                    <i class="fas fa-box-open fa-3x mb-3"></i>
                    <h5>Нет доступных товаров</h5>
                    <p>Нажмите кнопку "Добавить препарат", чтобы создать первый товар</p>
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
            productCard.render(
                cardData,
                this.handleProductClick.bind(this),
                this.handleDeleteProduct.bind(this)
            );
        });
    }

    async addProduct(productData) {
        if (!productData.name || !productData.price) {
            alert('Пожалуйста, заполните обязательные поля: Название и Цена');
            return { success: false, error: 'Не заполнены обязательные поля' };
        }

        if (!productData.image) {
            productData.image = 'https://via.placeholder.com/300x200?text=МедФарм';
        }

        try {
            const { data: newProduct, status } = await fetchApi.post(
                apiUrls.createProduct(),
                productData
            );

            if (status === 201 && newProduct) {
                await this.loadProducts();
                return { success: true, product: newProduct };
            } else {
                return { success: false, error: 'Не удалось создать товар' };
            }
        } catch (error) {
            console.error('Ошибка создания:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteProduct(productId) {
        const confirmed = confirm('Вы уверены, что хотите удалить этот препарат?');
        if (!confirmed) return false;

        try {
            const { status } = await fetchApi.delete(apiUrls.deleteProduct(productId));

            if (status === 204) {
                await this.loadProducts();
                return true;
            } else {
                alert('Не удалось удалить товар');
                return false;
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
            alert('Ошибка при удалении товара');
            return false;
        }
    }

    openAddModal() {
        document.getElementById('add-product-form').reset();
        const modal = new bootstrap.Modal(document.getElementById('addProductModal'));
        modal.show();
    }

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

    handleProductClick(productId) {
        const productPage = new ProductPage(this.parent, productId);
        productPage.render();
    }

    async handleDeleteProduct(productId) {
        await this.deleteProduct(productId);
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        this.setupAddButton();
        this.loadProducts();
    }
}
