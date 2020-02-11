const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

selectProducts = async () => {
    try {
        const db = await dbCon;
        const selectAllProducts = 'SELECT name, description, price, id, category_id FROM products';
        const allProdRows = await db.all(selectAllProducts);

        return allProdRows;
    } catch (error) {
        throw new Error(error);
    }
};

selectProduct = async (productId) => {
    try {
        const db = await dbCon;
        selectProduct = 'SELECT name, description, price, id, category_id FROM products WHERE id = ?';
        const prodRow = await db.get(selectProduct, productId);

        return prodRow;
    } catch (error) {
        throw new Error(error);
    }
};

insertProduct = async (name, description, price, category_id) => {
    try {
        const db = await dbCon;
        const insertProduct = 'INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)';
        await db.run(insertProduct, name, description, price, category_id);
    } catch (error) {
        throw new Error(error);
    }
};

deleteProduct = async (productId) => {
    try {
        const db = await dbCon;
        const deleteProduct = 'DELETE FROM products WHERE id = ?';

        await db.run(deleteProduct, productId);
    } catch (error) {
        throw new Error(error);
    }
};

updateProduct = async (name, description, price, category_id, productId) => {
    try {
        const db = await dbCon;
        const updateProduct = 'UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?';
        await db.run(updateProduct, name, description, price, category_id, productId);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getProducts: selectProducts,
    getProduct: selectProduct,
    addProduct: insertProduct,
    delProduct: deleteProduct,
    putProduct: updateProduct,
};
