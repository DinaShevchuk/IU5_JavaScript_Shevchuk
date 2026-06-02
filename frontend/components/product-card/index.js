export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="col-lg-4 col-md-6 mb-4 fade-in">
                <div class="product-card">
                    <div class="product-image-wrapper">
                        <img class="product-image" src="${data.image}" alt="${data.name}">
                        <span class="product-badge">
                            <i class="fas fa-check-circle me-1"></i>В наличии
                        </span>
                    </div>
                    <div class="product-body">
                        <h5 class="product-title">${data.name}</h5>
                        <p class="product-description">${data.shortDescription || 'Современный эффективный препарат для вашего здоровья'}</p>
                        <div class="product-footer">
                            <div class="product-price">
                                ${data.price}
                                <small> руб.</small>
                            </div>
                            <button class="btn-detail" data-id="${data.id}">
                                <i class="fas fa-info-circle me-1"></i>Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    addListeners(data, listener) {
        const button = document.querySelector(`button[data-id="${data.id}"]`);
        if (button) {
            button.addEventListener("click", () => listener(data.id));
        }
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}
