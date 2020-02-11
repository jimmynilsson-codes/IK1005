const routes = require('express').Router();
const products = require('./products');

routes.get('/', (req, res) => {
    res.json({ user: 'h06jimni@du.se' });
});

routes.get('/getproducts/', async (req, res) => {
    try {
        const productsInDb = await products.getProducts();
        res.json(productsInDb);
    } catch (error) {
        res.json(error);
    }
});

routes.get('/getproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productInDb = await products.getProduct(productId);
        res.json(productInDb);
    } catch (error) {
        res.json(error);
    }
});

routes.post('/addproduct/', async (req, res) => {
    try {
        const productName = req.body.name;
        const productDesc = req.body.description;
        const productPrice = req.body.price;
        const productCategoryId = req.body.category_id;

        await products.addProduct(productName, productDesc, productPrice, productCategoryId);
        res.json({ status: 'Product added.' });
    } catch (error) {
        res.json(error);
    }
});

routes.delete('/delproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await products.delProduct(productId);

        res.json({ status: 'Product deleted.' });
    } catch (error) {
        res.json(error);
    }
});

routes.put('/updateproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productName = req.body.name;
        const productDesc = req.body.description;
        const productPrice = req.body.price;
        const productCategoryId = req.body.category_id;

        await products.putProduct(productName, productDesc, productPrice, productCategoryId, productId);
        res.json({ status: 'Product updated.' });
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;