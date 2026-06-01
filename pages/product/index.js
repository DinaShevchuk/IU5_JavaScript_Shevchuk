import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { productsBD } from "../../database.js"; // Используем один источник данных

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
                <div id="product-detail" class="detail-card"></div>
            </div>
        `;
    }

    render() {
        const product = productsBD.getByID(this.productId);

        if (!product) {
            console.error('Product not found');
            return;
        }

        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const detailDiv = document.getElementById('product-detail');

        detailDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${product.image}" class="detail-image" alt="${product.name}">
                </div>
                <div class="col-md-6">
                    <div class="detail-body">
                        <button class="btn-detail" id="back-button">
                            <i class="fas fa-arrow-left"></i> Вернуться к каталогу
                        </button>
                        <h2 class="detail-title">${product.name}</h2>
                        <div class="detail-price">
                            <i class="fas fa-ruble-sign"></i> ${product.price} руб.
                        </div>
                        <p class="detail-description">${product.description}</p>
                        <div class="info-section">
                            <h6><i class="fas fa-pills me-2"></i> Форма выпуска:</h6>
                            <p>${product.form}</p>
                        </div>
                        <div class="info-section">
                            <h6><i class="fas fa-clock me-2"></i> Дозировка:</h6>
                            <p>${product.dosage}</p>
                        </div>
                        <div class="info-section">
                            <h6><i class="fas fa-exclamation-triangle me-2"></i> Противопоказания:</h6>
                            <p>${product.contraindications}</p>
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
}
