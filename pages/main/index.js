import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { productsBD } from "../../database.js"; // Добавить импорт

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

    clickProduct(productId) {
        const productPage = new ProductPage(this.parent, productId);
        productPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const products = productsBD.getAll();
        products.forEach((product) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            // Убедитесь, что передаете нужные поля
            const cardData = {
                id: product.id,
                name: product.name,
                shortDescription: product.description.substring(0, 50) + '...', // Обрезаем описание
                image: product.image,
                price: product.price + " ₽"
            };
            productCard.render(cardData, this.clickProduct.bind(this));
        });
    }
}
