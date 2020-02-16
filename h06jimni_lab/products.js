const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

//function to get all products from table 'products'
const selectProducts = async () => {
    try {
        const db = await dbCon;
        const selectAllProductsQuery = 'SELECT products.name AS product_name, category.name AS category_name,' 
        + 'products.description AS product_description, products.price AS product_price, products.id as product_id ' 
        + 'FROM products INNER JOIN category ON category.category_id = products.category_id';
        const allProdRows = await db.all(selectAllProductsQuery);

        return allProdRows;
    } catch (error) {
        throw error;
    }
};

//function to get product based on incoming parameter 'productId' from table 'products'
const selectProduct = async (productId) => {
    try {
        const db = await dbCon;
        const selectProductQuery = 'SELECT products.name AS product_name, category.name AS category_name,' 
        + ' products.description AS product_description, products.price AS product_price, products.id as product_id' 
        + ' FROM products INNER JOIN category ON category.category_id = products.category_id WHERE id = ?';
        const prodRow = await db.get(selectProductQuery, productId);

        return prodRow;
    } catch (error) {
        throw new Error(error);
    }
};

//function to get products by category based on incoming parameter 'categoryName' from table 'products'
const selectProductByCategory = async (categoryName) => {
    try {
        const db = await dbCon;
        const selectProductByCategoryQuery = 'SELECT products.name as product_name, category.name AS category_name' 
        + ' FROM products INNER JOIN category ON category.category_id = products.category_id WHERE category_name = ?';
        const prodRowByCat = await db.all(selectProductByCategoryQuery, categoryName);

        return prodRowByCat;
    } catch (error) {
        throw error;
    }
}

//function to insert product with parameter 'productName', 'productDescription', 'productPrice', 'category_id' to table 'products' 
const insertProduct = async (productName, productDescription, productPrice, category_id) => {
    try {
        const db = await dbCon;
        const insertProductQuery = 'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)';
        await db.run(insertProductQuery, productName, productDescription, productPrice, category_id);
    } catch (error) {
        throw new Error(error);
    }
};

//function to delete product from table 'products' based on parameter 'productId'
const deleteProduct = async (productId) => {
    try {
        const db = await dbCon;
        const deleteProductQuery = 'DELETE FROM products WHERE id = ?';

        await db.run(deleteProductQuery, productId);
    } catch (error) {
        throw new Error(error);
    }
};

//function to update product based on 'productId' with parameter 'productName', 'productDescription', 'productPrice', 'category_id' to table 'products' 
const updateProduct = async (productName, productDescription, productPrice, category_id, productId) => {
    try {
        const db = await dbCon;
        const updateProductQuery = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?';
        await db.run(updateProductQuery, name, description, price, category_id, productId);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts: selectProducts,
    getProduct: selectProduct,
    addProduct: insertProduct,
    delProduct: deleteProduct,
    updProduct: updateProduct,
    getProdByCat : selectProductByCategory,
};
