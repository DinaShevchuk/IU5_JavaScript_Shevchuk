export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        const imageUrl = data.image && data.image.trim() !== ''
            ? data.image
            : 'https://via.placeholder.com/300x200?text=МедФарм';

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
