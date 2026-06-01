const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = (searchQuery) => {
    const products = fileService.readData(dataFilePath);
    if (searchQuery) {
        return products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    return products;
};

const findOne = (id) => {
    const products = fileService.readData(dataFilePath);
    return products.find(product => product.id === parseInt(id));
};

const create = (productData) => {
    const products = fileService.readData(dataFilePath);

    const newId = products.length > 0
        ? Math.max(...products.map(p => p.id)) + 1
        : 1;

    const newProduct = { id: newId, ...productData };
    products.push(newProduct);
    fileService.writeData(dataFilePath, products);

    return newProduct;
};

const update = (id, productData) => {
    const products = fileService.readData(dataFilePath);
    const index = products.findIndex(p => p.id === parseInt(id));

    if (index === -1) return null;

    products[index] = { ...products[index], ...productData, id: products[index].id };
    fileService.writeData(dataFilePath, products);

    return products[index];
};

const remove = (id) => {
    const products = fileService.readData(dataFilePath);
    const filteredProducts = products.filter(p => p.id !== parseInt(id));

    if (filteredProducts.length === products.length) {
        return false;
    }

    fileService.writeData(dataFilePath, filteredProducts);
    return true;
};

module.exports = { init, findAll, findOne, create, update, remove };
