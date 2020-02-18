const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

//function to get all categories from table 'categories'
const getCategories = async () => {
    try {
        const db = await dbCon;
        const selectAllCategories = 'SELECT name, category_id FROM category';
        const allCategoryRows = db.all(selectAllCategories);

        return allCategoryRows;
    } catch (error) {
        throw error;
    }
};

//function to get category based on incoming parameter 'categoryId' from table 'categories'
const getCategory = async (categoryId) => {
    try {
        const db = await dbCon;
        const selectCategory = 'SELECT name, category_id FROM category WHERE category_id = ?';
        const categoryRow = db.get(selectCategory, categoryId);

        return categoryRow;
    } catch (error) {
        throw error;
    }
};

//function to insert category with parameter 'categoryName' to table 'categories' 
const addCategory = async (categoryName) => {
    try {
        const db = await dbCon;
        const insertCategory = 'INSERT INTO category (name) VALUES (?)';

        await db.run(insertCategory, categoryName);
    } catch (error) {
        throw error;
    }
};

//function to delete category from table 'categories' based on parameter 'categoryId'
const deleteCategory = async (categoryId) => {
    try {
        const db = await dbCon;
        const deleteCategory = 'DELETE FROM category WHERE category_id = ?';

        const result = await db.run(deleteCategory, categoryId);
        return result;
    } catch (error) {
        throw error;
    }
};

//function to update category based on 'categoryId' with parameter 'categoryName', to table 'categories' 
const updateCategory = async (categoryName ,categoryId) => {
    try {
        const db = await dbCon;
        const updateCategory = 'UPDATE category SET name = ? WHERE category_id = ?';

        const result = await db.run(updateCategory, categoryName, categoryId);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCategories: getCategories,
    getCategory: getCategory,
    addCategory: addCategory,
    deleteCategory: deleteCategory,
    updateCategory: updateCategory,
};