const productsService = require('../services/productsService');

const getAllProducts = (req, res) => {
    const { name, price, form, description } = req.query;

    console.log('=== ПОЛУЧЕН ЗАПРОС ===');
    console.log('name:', name);
    console.log('price:', price);
    console.log('form:', form);
    console.log('description:', description);
    console.log('========================');

    let products;

    if (name) {
        products = productsService.findByName(name);
    } else if (price) {
        products = productsService.findByPrice(price);
    } else if (form) {
        products = productsService.findByForm(form);
    } else if (description) {
        products = productsService.findByDescription(description);
    } else {
        products = productsService.findAll();
    }

    res.json(products);
};

const getProductById = (req, res) => {
    const { id } = req.params;
    const product = productsService.findOne(id);

    if (!product) {
        return res.status(404).json({ error: 'Товар не найден' });
    }

    res.json(product);
};

const createProduct = (req, res) => {
    const { name, price, image, description, form, dosage, contraindications } = req.body;

    if (!name || !price) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены (name, price)' });
    }

    const newProduct = productsService.create({
        name,
        price,
        image,
        description: description || '',
        form: form || '',
        dosage: dosage || '',
        contraindications: contraindications || ''
    });

    res.status(201).json(newProduct);
};

const updateProduct = (req, res) => {
    const { id } = req.params;
    const updatedProduct = productsService.update(id, req.body);

    if (!updatedProduct) {
        return res.status(404).json({ error: 'Товар не найден' });
    }

    res.json(updatedProduct);
};

const deleteProduct = (req, res) => {
    const { id } = req.params;
    const success = productsService.remove(id);

    if (!success) {
        return res.status(404).json({ error: 'Товар не найден' });
    }

    res.status(204).send();
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
