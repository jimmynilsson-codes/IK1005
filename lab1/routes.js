const routes = require('express').Router();
const Promise = require('bluebird');
const sqlite = require('sqlite');
const database = require('./database');

const dbOpen = sqlite.open('./database.db', { Promise });

routes.get('/sqlselect/', async (req, res) => {
    try {
        const db = await dbOpen;
        const sqlSelect = 'SELECT id, name, category from products';
        const rows = await db.all(sqlSelect);
        res.json(rows);
    } catch (err) {
        res.json(err);
    }
});

routes.get('/sqlselect/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sqlSelectId = 'SELECT id, name, category from products WHERE  id = ?';
        const db = await dbOpen;
        const row = await db.all(sqlSelectId, id);
        const productExists = row.find(() => {
            return true;
        });
        if (productExists) {
            res.json(row);
        } else {
            res.json(`Product with id ${id} was not found!`);
        }
    } catch (err) {
        res.json(err);
    }
});

routes.post('/sqlinsert/', async (req, res) => {
    try {
        const sqlInsert = 'INSERT INTO products (name, category) VALUES(?,?)';
        const db = await dbOpen;
        const name = req.body.name;
        const category = req.body.category;
        db.run(sqlInsert, name, category);
        res.json({ status: 'insert ok' });
    } catch (err) {
        res.json(err);
    }
});

routes.delete('/sqldelete/:id', async (req, res) => {
    try {
        const sqlDeleteId = 'DELETE FROM products WHERE id = ?';
        const db = await dbOpen;
        const delId = req.params.id;
        db.run(sqlDeleteArtNr, delArtnr);
        res.json({ status: `Product with id ${delId} has ben deleted!` });
    } catch (err) {
        res.json(err);
    }
});

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

module.exports = routes;