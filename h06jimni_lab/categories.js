const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

selectCategories = async () => {
    try {
        const db = await dbCon;
        const selectAllCategories = 'SELECT name, category_id FROM category';
        const allCategoryRows = db.all(selectAllCategories);

        return allCategoryRows;
    } catch (error) {
        throw new Error(error);
    }
};

selectCategory = async (categoryId) => {
    try {
        const db = await dbCon;
        const selectCategory = 'SELECT name, category_id FROM category WHERE category_id = ?';
        const categoryRow = db.get(selectCategory, categoryId);

        return categoryRow;
    } catch (error) {
        throw new Error(error);
    }
};

insertCategory = async (categoryName) => {
    try {
        const db = await dbCon;
        const insertCategory = 'INSERT INTO category (name) VALUES (?)';

        await db.run(insertCategory, categoryName);
    } catch (error) {
        throw new Error(error);
    }
};

deleteCategory = async (categoryId) => {
    try {
        const db = await dbCon;
        const deleteCategory = 'DELETE FROM category WHERE category_id = ?';

        await db.run(deleteCategory, categoryId);
    } catch (error) {
        throw new Error(error);
    }
};

updateCategory = async (categoryName ,categoryId) => {
    try {
        const db = await dbCon;
        const updateCategory = 'UPDATE category SET name = ? WHERE category_id = ?';

        await db.run(updateCategory, categoryName, categoryId);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getCategories: selectCategories,
    getCategory: selectCategory,
    addCategory: insertCategory,
    delCategory: deleteCategory,
    updCategory: updateCategory,
}

//gör getmetod för att visa produkter som tillhör en viss kategori

//SELECT products.name AS product_name, products.price AS product_price, products.id AS product_id, category.name AS category_name FROM products INNER JOIN category ON category.category_id = products.category_id WHERE category.category_id = 1;