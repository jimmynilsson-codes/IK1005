const routes = require('express').Router();
const products = require('./products');
const users = require('./users');
const categories = require('./categories');
const datavalidation = require('./datavalidation');
const login = require('./login');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
        res.json({ status: error.message });
    }
});

//endpoint to get product based on parameter id
routes.get('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productInDb = await products.getProduct(productId);

        if (productInDb !== undefined) {
            res.json(productInDb);
        } else {
            throw Error(`No product with id ${productId} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to get products in a category based on parameter id
routes.get('/productsbycat/:id', async (req, res) => {
    try {
        const categoryName = req.params.id;
        const prodInDbByCat = await products.getProductByCategory(categoryName);

        if (prodInDbByCat.length !== 0) {
            res.json(prodInDbByCat);
        } else {
            throw Error(`No products in category ${categoryName} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to add product
routes.post('/product/', async (req, res) => {
    try {
        const prodData = {
            productName: req.body.name,
            productDesc: req.body.description,
            productPrice: req.body.price,
            productCategoryId: req.body.category_id,
        };

        const validData = datavalidation.productValidation(prodData);

        if (validData) {
            await products.addProduct(prodData.productName, prodData.productDesc, prodData.productPrice, prodData.productCategoryId);
            res.json({ status: 'Product added.' });
        } else {
            throw Error('Invalid input.');
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to delete product based on parameter id
routes.delete('/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await products.deleteProduct(productId);

        if (deletedProduct.changes !== 0) {
            res.json({ status: 'Product deleted.' });
        } else {
            throw Error(`No product with id ${productId} was found.`);
        }

    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to update product based on request body object
routes.put('/product/', async (req, res) => {
    try {
        const prodData = {
            productId: req.body.id,
            productName: req.body.name,
            productDesc: req.body.description,
            productPrice: req.body.price,
            productCategoryId: req.body.category_id,
        };

        const validData = datavalidation.productValidation(prodData);

        if (validData) {
            const updatedProduct = await products.updateProduct(prodData.productName, prodData.productDesc, prodData.productPrice, prodData.productCategoryId, prodData.productId);

            if (updatedProduct.changes !== 0) {
                res.json({ status: 'Product updated.' });
            } else {
                throw Error(`No product with id ${prodData.productId} was found.`);
            }
        } else {
            throw Error('Invalid input.');
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to get all users
routes.get('/users/', async (req, res) => {
    try {
        const usersInDb = await users.getUsers();

        res.json(usersInDb);
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to get user based on parameter id
routes.get('/user/:id', async (req, res) => {
    try {
        userId = req.params.id;
        const userInDb = await users.getUser(userId);

        if (userInDb !== undefined) {
            res.json(userInDb);
        } else {
            throw Error(`No user with id ${userId} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//enpoint to add user
routes.post('/user/', async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };

        const validData = datavalidation.userValidation(userData);

        if (validData) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(userData.password, salt);
            await users.addUser(userData.email, userData.firstname, userData.lastname, hash);
            res.json({ status: 'User added.' });
        } else {
            throw Error('Invalid input.');
        }
    } catch (error) {
        res.json({ status: error.message });
    };
});

//endpoint to delete user based on parameter id
routes.delete('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await users.deleteUser(userId);

        if (deletedUser.changes !== 0) {
            res.json({ status: 'User deleted.' });
        } else {
            throw Error(`No user with id ${userId} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to update user based on parameter id
routes.put('/user/', async (req, res) => {
    try {
        const userData = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            id: req.body.id,
        };

        const validData = datavalidation.userValidation(userData);

        if (validData) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(userData.password, salt);
            const updatedUser = await users.updateUser(userData.email, userData.firstname, userData.lastname, hash, userData.id);

            if (updatedUser.changes !== 0) {
                res.json({ status: 'User updated.' });
            } else {
                throw Error(`No user with id ${userData.id} was found.`);
            }
        } else {
            throw Error('Invalid input.');
        }
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
        res.json({ status: error.message });
    }
});

//endpoint to get a category based on parameter id
routes.get('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryInDb = await categories.getCategory(categoryId);

        if (categoryInDb !== undefined) {
            res.json(categoryInDb);
        } else {
            throw Error(`No category with id ${categoryId} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to add category
routes.post('/category/', async (req, res) => {
    try {
        const categoryName = req.body.name;

        const validData = datavalidation.categoryValidation(categoryName);

        if (validData) {
            await categories.addCategory(categoryName);
            res.json({ status: 'Category added.' });
        } else {
            throw Error('Invalid input.');
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to delete category based on parameter id
routes.delete('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const deletedCategory = await categories.deleteCategory(categoryId);

        if (deletedCategory.changes !== 0) {
            res.json({ status: 'Category deleted.' });
        } else {
            throw Error(`No category with id ${categoryId} was found.`);
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

//endpoint to update category based on parameter id
routes.put('/category/', async (req, res) => {
    try {
        const categoryData = {
            categoryName: req.body.name,
            categoryId: req.body.id,
        }

        const validData = datavalidation.categoryValidation(categoryData);

        if (validData) {
            const updatedCategory = await categories.updateCategory(categoryData.categoryName, categoryData.categoryId);
            if (updatedCategory.changes !== 0) {
                res.json({ status: 'Category updated.' });
            } else {
                throw Error(`No category with id ${categoryData.categoryId} was found.`);
            }
        } else {
            throw Error('Invalid input.');
        }
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
        const isMatch = await bcrypt.compare(password, hash.password);

        if (isMatch) {
            res.json({ status: `${email} logged in.` });
        } else {
            res.json({ status: 'Invalid password!' });
        }
    } catch (error) {
        res.json({ status: error.message });
    }
});

module.exports = routes;