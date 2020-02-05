const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

const products = [];

app.use(express.json());

app.post('/product', (req, res) => {
    const data = req.body;

    const found = products.find((p) => {
        return p.id === data.id;
    });
    if (!found) {
        products.push(data);
        res.json({ status: 'ok' });
    }
    else {
        res.status(400).send(`Duplicate id for produc with id:  ${data.id}`);
    }
});

app.get('/', (req, res) => {
    res.send('h06jimni@du.se')
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/product/:id', (req, res) => {
    const product = products.find((p) => {
        return p.id == req.params.id;
    });
    if (product) {
        res.json(product);
    } else {
        res.status(404).send(`Product with id: ${req.params.id} not found`);
    }
});

app.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
});