class ApiUrls {
    constructor() {
        this.baseUrl = '';
    }

    getProducts() {
        return `/api/products`;
    }

    getProductsByName(name) {
        return `/api/products?name=${encodeURIComponent(name)}`;
    }

    getProductsByPrice(price) {
        return `/api/products?price=${encodeURIComponent(price)}`;
    }

    getProductsByForm(form) {
        return `/api/products?form=${encodeURIComponent(form)}`;
    }

    getProductsByDescription(description) {
        return `/api/products?description=${encodeURIComponent(description)}`;
    }

    getProductById(id) {
        return `/api/products/${id}`;
    }

    createProduct() {
        return `/api/products`;
    }

    updateProduct(id) {
        return `/api/products/${id}`;
    }

    deleteProduct(id) {
        return `/api/products/${id}`;
    }
}

export const apiUrls = new ApiUrls();
