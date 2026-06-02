class ApiUrls {
    constructor() {
        this.baseUrl = '';
    }

    getProducts() {
        return `/api/products`;
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
