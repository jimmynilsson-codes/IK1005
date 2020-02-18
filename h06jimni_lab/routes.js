const routes = require('express').Router();
const products = require('./products');
const users = require('./users');
const categories = require('./categories');
const datavalidation = require('./datavalidation');
const login = require('./login');
const bcrypt = require('bcrypt');

//endpoint to root
routes.get('/', (req, res) => {
    res.json({ user: 'h06jimni@du.se' });
});

//endpoint to get all products
routes.get('/products/', async (req, res) => {
    try {
        const productsInDb = await products.getProducts();
        res.json(productsInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get product based on parameter id
routes.get('/product/:id', async (req, res) => {
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
routes.get('/productsbycat/:id', async (req, res) => {
    try {
        const categoryName = req.params.id;
        const prodInDbByCat = await products.getProdByCat(categoryName);

        res.json(prodInDbByCat);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to add product
routes.post('/product/', async (req, res) => {
    try {
        const productName = req.body.name;
        const productDesc = req.body.description;
        const productPrice = req.body.price;
        const productCategoryId = req.body.category_id;

        const prodData = [productName, productDesc, productPrice, productCategoryId];

        datavalidation.prodValidation(prodData);

        await products.addProduct(productName, productDesc, productPrice, productCategoryId);
        res.json({ status: 'Product added.' });
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to delete product based on parameter id
routes.delete('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await products.delProduct(productId);

        res.json({ status: 'Product deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update product based on parameter id
routes.put('/product/', async (req, res) => {
    try {
        const productId = req.body.id;
        const productName = req.body.name;
        const productDesc = req.body.description;
        const productPrice = req.body.price;
        const productCategoryId = req.body.category_id;
        if (productId.length === 0) {
            throw Error('Invalid input');
        }

        prodData = [productName, productDesc, productPrice, productCategoryId];

        datavalidation.prodValidation(prodData);

        await products.updProduct(productName, productDesc, productPrice, productCategoryId, productId);
        res.json({ status: 'Product updated.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get all users
routes.get('/users/', async (req, res) => {
    try {
        const usersInDb = await users.getUsers();

        res.json(usersInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get user based on parameter id
routes.get('/user/:id', async (req, res) => {
    try {
        userId = req.params.id;
        const userInDb = await users.getUser(userId);

        res.json(userInDb);
    } catch (error) {
        res.json(error);
    }
});

//enpoint to add user
routes.post('/user/', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userFirstname = req.body.firstname;
        const userLastname = req.body.lastname;
        const userPassword = req.body.password;

        const userInputData = { 
            email: userEmail,
            firstname: userFirstname,
            lastname: userLastname,
            password: userPassword
        };

        //const userData = [userEmail, userFirstname, userLastname, userPassword];

        datavalidation.userValidation(userInputData);

        await users.addUser(userEmail, userFirstname, userLastname, userPassword);
        res.json({ status: 'User added.' });
    } catch (error) {
        res.json({ status: error.message });
    };
});

//endpoint to delete user based on parameter id
routes.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        await users.delUser(userId);
        res.json({ status: 'User has been deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update user based on parameter id
routes.put('/user/', async (req, res) => {
    try {
        const userEmail = req.body.email;
        const userFirstname = req.body.firstname;
        const userLastname = req.body.lastname;
        const userPassword = req.body.password;
        const userId = req.body.id;
        if (userId.length === 0) {
            throw Error('Invalid input');
        }

        const userData = [userEmail, userFirstname, userLastname, userPassword];

        datavalidation.userValidation(userData);

        await users.updUser(userEmail, userFirstname, userLastname, userPassword, userId);
        res.json({ status: 'User have been updated.' });
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to get all categories
routes.get('/categories/', async (req, res) => {
    try {
        categoriesInDb = await categories.getCategories();

        res.json(categoriesInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to get a category based on parameter id
routes.get('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryInDb = await categories.getCategory(categoryId);

        res.json(categoryInDb);
    } catch (error) {
        res.json(error);
    }
});

//endpoint to add category
routes.post('/category/', async (req, res) => {
    try {
        const categoryName = req.body.name;

        datavalidation.catValidation(categoryName);

        await categories.addCategory(categoryName);
        res.json({ status: 'Category added.' });
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to delete category based on parameter id
routes.delete('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        categories.delCategory(categoryId);

        res.json({ status: 'Category was deleted.' });
    } catch (error) {
        res.json(error);
    }
});

//endpoint to update category based on parameter id
routes.put('/category/', async (req, res) => {
    try {
        const categoryName = req.body.name;
        const categoryId = req.body.id;
        if (categoryId.length === 0) {
            throw Error('Invalid input');
        }

        datavalidation.catValidation(categoryName);

        await categories.updCategory(categoryName, categoryId);

        res.json({ status: 'Category was updated.' });
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to login
routes.post('/login/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const hash = await login.checkLogin(email);

        const match = await bcrypt.compare(password, hash.password);

        if (match) {
            res.json({ status: `${email} logged in.` });
        } else {
            res.json({ status: 'Invalid password!' });
        }
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;