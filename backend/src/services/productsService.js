const fileService = require('./fileService');

let dataFilePath;

const init = (filePath) => {
    dataFilePath = filePath;
};

const findAll = () => {
    return fileService.readData(dataFilePath);
};

const findOne = (id) => {
    const products = fileService.readData(dataFilePath);
    return products.find(product => product.id === parseInt(id));
};

const findByName = (name) => {
    const products = fileService.readData(dataFilePath);
    const query = name.toString().toLowerCase();

    return products.filter(product => {
        return product.name && product.name.toLowerCase().includes(query);
    });
};

const findByPrice = (price) => {
    const products = fileService.readData(dataFilePath);
    const query = price.toString();

    return products.filter(product => {
        return product.price && product.price.toString() === query;
    });
};

const findByForm = (form) => {
    const products = fileService.readData(dataFilePath);
    const query = form.toString().toLowerCase();

    return products.filter(product => {
        return product.form && product.form.toLowerCase().includes(query);
    });
};

const findByDescription = (description) => {
    const products = fileService.readData(dataFilePath);
    const query = description.toString().toLowerCase();

    return products.filter(product => {
        return product.description && product.description.toLowerCase().includes(query);
    });
};

const create = (productData) => {
    const products = fileService.readData(dataFilePath);

    const newId = products.length > 0
        ? Math.max(...products.map(p => p.id)) + 1
        : 1;

    const newProduct = {
        id: newId,
        name: productData.name || 'Без названия',
        price: productData.price ? productData.price.toString() : '0',
        image: productData.image || 'https://via.placeholder.com/300x200?text=МедФарм',
        description: productData.description || '',
        form: productData.form || '',
        dosage: productData.dosage || '',
        contraindications: productData.contraindications || ''
    };

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

module.exports = {
    init,
    findAll,
    findOne,
    findByName,
    findByPrice,
    findByForm,
    findByDescription,
    create,
    update,
    remove
};
