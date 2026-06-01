const productsService = require('../services/productsService');

const getAllProducts = (req, res) => {
    const { search } = req.query;
    const products = productsService.findAll(search);
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

    if (!name || !price || !image) {
        return res.status(400).json({ error: 'Не все обязательные поля заполнены (name, price, image)' });
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
