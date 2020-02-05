const routes = require('express').Router();

const products = [
    { id: '1', name: 'prod1' },
    { id: '2', name: 'prod2' }
];

routes.get('/', (req, res) => {
    res.send('h06jimni@du.se');
});

routes.get('/products', (req, res) => {
    res.json(products);
});

routes.get('/product/:id', (req, res) => {
    const product = products.find((p) => {
        return p.id == req.params.id;
    });
    if (product) {
        res.json(product);
    } else {
        res.status(400).send(`Product with id ${req.params.id} not found!`);
    }
});

routes.post('/product', (req, res) => {
    const data = req.body;

    const found = products.find((p) => {
        return p.id === data.id;
    });
    if (!found) {
        products.push(data);
        res.json({ status: 'ok' });
    } else{
        res.status(400).send(`Product with id ${data.id} already exists!`);
    }
});

module.exports = routes;