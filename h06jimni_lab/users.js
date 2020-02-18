const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

//function to get all users from table 'users'
const getUsers = async () => {
    try {
        const db = await dbCon;
        const selectAllUsers = 'SELECT email, firstname, lastname, id FROM users';
        const allUserRows = await db.all(selectAllUsers);

        return allUserRows;
    } catch (error) {
        throw error;
    }
};

//function to get user based on incoming parameter 'userId' from table 'users'
const getUser = async (userId) => {
    try {
        const db = await dbCon;
        const selectUser = 'SELECT email, firstname, lastname, id FROM users WHERE id = ?';
        const userRow = db.get(selectUser, userId);

        return userRow;
    } catch (error) {
        throw error;
    }
};

//function to insert user with parameter 'userEmail', 'userFirstname', 'userLastname', 'userPassword' to table 'users' 
const addUser = async (userEmail, userFirstname, userLastname, hash) => {
    try {
        const db = await dbCon;
        const insertUser = 'INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?, ?)';
        await db.run(insertUser, userEmail, userFirstname, userLastname, hash);

    } catch (error) {
        throw error;
    }
};

//function to delete user from table 'users' based on parameter 'userId'
const deleteUser = async (userId) => {
    try {
        const db = await dbCon;
        const deleteUser = 'DELETE FROM users WHERE id = ?';

        const result = await db.run(deleteUser, userId);
        return result;
    } catch (error) {
        throw error;
    }
};

//function to update user based on 'userId' with parameter 'userEmail', 'userFirstname', 'userLastname', 'userPassword' to table 'users' 
const updateUser = async (userEmail, userFirstname, userLastname, hash, userId) => {
    try {
        const db = await dbCon;
        const updateUser = 'UPDATE users SET email = ?, firstname = ?, lastname = ?, password = ? WHERE id = ?';

        const result = await db.run(updateUser, userEmail, userFirstname, userLastname, hash, userId);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    addUser: addUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
};