const express = require('express');
const path = require('path');
const productsRouter = require('./routes/products');
const productsService = require('./services/productsService');

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, 'data/products.json');

productsService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use('/api/products', productsRouter);

app.use((req, res, next) => {

    if (req.path.startsWith('/api')) {
        return next();
    }

    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Ошибка отправки index.html:', err);
            res.status(404).send('File not found');
        }
    });
});

app.use('/api/*', (req, res) => {
    res.status(404).json({ error: 'API маршрут не найден' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
    console.log(`📦 API доступен по адресу: http://localhost:${PORT}/api/products`);
    console.log(`🌐 Фронтенд доступен по адресу: http://localhost:${PORT}`);
});
