const routes = require('express').Router();
const Promise = require('bluebird');
const sqlite = require('sqlite');

const dbOpen = sqlite.open('./database.db', { Promise });

/*routes.get('/select', async (req, res) => {
    const db = await dbOpen;
    db.all('SELECT * FROM products')
    .then( (rows) => {
        res.json(rows);
    }).catch( (e) => {
        res.send(e);
    }).finally
});*/

routes.get('/select', async (req, res) => {
    try {
        const db = await dbOpen;
        const sqlSelect = 'SELECT * from products';
        const rows = await db.all(sqlSelect);
        res.json(rows);
    } catch {

    }
});

const products = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' }
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
    } else {
        res.status(400).send(`Product with id ${data.id} already exists!`);
    }
});

routes.delete('/product/:id', (req, res) => {
    for (let i = products.length - 1; i > 0; i--) {
        if (products[i].id == req.params.id) {
            products.splice(i, 1);
        }
    }
});

module.exports = routes;