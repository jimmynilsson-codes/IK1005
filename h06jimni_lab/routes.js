const routes = require('express').Router();
const products = require('./products');
const users = require('./users');
const categories = require('./categories');
const datavalidation = require('./datavalidation');

//endpoint to root
routes.get('/', (req, res) => {
    res.json({ user: 'h06jimni@du.se' });
});

//endpoint to get all products
routes.get('/getproducts/', async (req, res) => {
    try {
        const productsInDb = await products.getProducts();
        res.json(productsInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get product based on parameter id
routes.get('/getproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productInDb = await products.getProduct(productId);
        res.json(productInDb);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

//endpoint to get products in a category based on parameter id
routes.get('/getproductsbycat/:id', async (req, res) => {
    try {
        const categoryName = req.params.id;
        const prodInDbByCat = await products.getProdByCat(categoryName);

        res.json(prodInDbByCat);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to add product
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

//endpoint to delete product based on parameter id
routes.delete('/delproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await products.delProduct(productId);

        res.json({ status: 'Product deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update product based on parameter id
routes.put('/updateproduct/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productName = req.body.name;
        const productDesc = req.body.description;
        const productPrice = req.body.price;
        const productCategoryId = req.body.category_id;

        await products.updProduct(productName, productDesc, productPrice, productCategoryId, productId);
        res.json({ status: 'Product updated.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get all users
routes.get('/getusers/', async (req, res) => {
    try {
        const usersInDb = await users.getUsers();

        res.json(usersInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get user based on parameter id
routes.get('/getuser/:id', async (req, res) => {
    try {
        userId = req.params.id;
        const userInDb = await users.getUser(userId);

        res.json(userInDb);
    } catch (error) {
        res.json(error);
    }
});

//enpoint to add user
routes.post('/adduser/', async (req, res) => {
    try {
        //const emailValidate = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        /* if (!emailValidate.test(userEmail)) {
            throw new Error('Email invalid.');
        } */

        const userEmail = req.body.email;
        const userFirstname = req.body.firstname;
        const userLastname = req.body.lastname;
        const userPassword = req.body.password;

        const userData = [userEmail, userFirstname, userLastname, userPassword];

        datavalidation.userValidation(userData);

        await users.addUser(userEmail, userFirstname, userLastname, userPassword);
        res.json({ status: 'User added.' });
    } catch (error) {
        res.json(error.message);
    };
});

//endpoint to delete user based on parameter id
routes.delete('/deluser/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await users.delUser(userId);
        res.json({ status: 'User has been deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update user based on parameter id
routes.put('/updateuser/:id', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userFirstname = req.body.firstname;
        const userLastname = req.body.lastname;
        const userPassword = req.body.password;
        const userId = req.params.id;

        await users.updUser(userEmail, userFirstname, userLastname, userPassword, userId);
        res.json({ status: 'User have been updated.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get all categories
routes.get('/getcategories/', async (req, res) => {
    try {
        categoriesInDb = await categories.getCategories();

        res.json(categoriesInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get a category based on parameter id
routes.get('/getcategory/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryInDb = await categories.getCategory(categoryId);

        res.json(categoryInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to add category
routes.post('/addcategory/', async (req, res) => {
    try {
        const categoryName = req.body.name;

        await categories.addCategory(categoryName);
        res.json({ status: 'Category added.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to delete category based on parameter id
routes.delete('/delcategory/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        categories.delCategory(categoryId);

        res.json({ status: 'Category was deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update category based on parameter id
routes.put('/updatecategory/:id', async (req, res) => {
    try {
        const categoryName = req.body.name;
        const cateogryId = req.params.id;
        await categories.updCategory(categoryName, cateogryId);

        res.json({ status: 'Category was updated.' });
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;