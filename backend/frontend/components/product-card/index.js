export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {

        const defaultImage = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect width=\'300\' height=\'200\' fill=\'%232a5298\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' fill=\'white\' font-size=\'16\'%3E%D0%9C%D0%B5%D0%B4%D0%A4%D0%B0%D1%80%D0%BC%3C/text%3E%3C/svg%3E';
        const imageUrl = (data.image && data.image.trim() !== '') ? data.image : defaultImage;

        return `
            <div class="col-lg-4 col-md-6 mb-4 fade-in">
                <div class="product-card card h-100 shadow-sm position-relative">
                    <button class="btn-delete-product" data-id="${data.id}"
                            style="position: absolute; top: 10px; right: 10px; z-index: 10;
                                   background: #dc3545; color: white; border: none;
                                   border-radius: 50%; width: 35px; height: 35px;
                                   display: flex; align-items: center; justify-content: center;
                                   cursor: pointer; transition: all 0.3s;">
                        <i class="fas fa-trash-alt"></i>
                    </button>

                    <div class="product-image-wrapper position-relative">
                        <img class="card-img-top product-image"
                             src="${imageUrl}"
                             alt="${data.name}"
                             style="height: 200px; object-fit: cover;">
                        <span class="product-badge position-absolute top-0 start-0 m-2 badge bg-success">
                            <i class="fas fa-check-circle me-1"></i>В наличии
                        </span>
                    </div>

                    <div class="card-body">
                        <h5 class="card-title product-title">${data.name || 'Без названия'}</h5>
                        <p class="card-text product-description text-muted small">
                            ${data.shortDescription || 'Описание отсутствует'}
                        </p>
                        <div class="product-footer d-flex justify-content-between align-items-center mt-3">
                            <div class="product-price">
                                <strong class="h5 text-primary">${data.price || '0'}</strong>
                            </div>
                            <button class="btn btn-sm btn-outline-primary btn-detail" data-id="${data.id}">
                                <i class="fas fa-info-circle me-1"></i>Подробнее
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, viewListener, deleteListener) {
        const detailButton = document.querySelector(`button.btn-detail[data-id="${data.id}"]`);
        if (detailButton) {
            detailButton.addEventListener("click", () => viewListener(data.id));
        }

        const deleteButton = document.querySelector(`button.btn-delete-product[data-id="${data.id}"]`);
        if (deleteButton) {
            deleteButton.addEventListener("click", (e) => {
                e.stopPropagation();
                deleteListener(data.id);
            });

            deleteButton.addEventListener("mouseenter", () => {
                deleteButton.style.background = "#c82333";
                deleteButton.style.transform = "scale(1.1)";
            });
            deleteButton.addEventListener("mouseleave", () => {
                deleteButton.style.background = "#dc3545";
                deleteButton.style.transform = "scale(1)";
            });
        }
    }

    render(data, viewListener, deleteListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, viewListener, deleteListener);
    }
}
