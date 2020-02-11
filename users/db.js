const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./database.db', { Promise });

const getUsers = async () => {
    try {
        const database = await dbCon;
        const selectAllUsers = 'SELECT userid, firstname, lastname, email, username, password FROM USERS';

        const allUserRows = await database.all(selectAllUsers);
        return allUserRows;
    } catch (error) {
        return error;
    }
};

const getUser = async (userid) => {
    try {
        const database = await dbCon;
        const selectUser = 'SELECT userid, firstname, lastname, email, username, password FROM users WHERE userid = ?';
        const userRow = await database.all(selectUser, userid);
        return userRow;
    } catch (error) {
        return error;
    }
};

const addUser = async (firstname, lastname, email, username, password) => {
    try {
        const database = await dbCon;
        const insertUser = 'INSERT INTO users (firstname, lastname, email, username, password) VALUES (?, ?, ?, ?, ?)';
        await database.run(insertUser, firstname, lastname, email, username, password);
    } catch (error) {
        return error;
    }
};

const delUser = async (userId) => {
    try {
        const database = await dbCon;
        const deleteUser = 'DELETE FROM users WHERE userid = ?';
        const a = await database.get(deleteUser, userId);
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const searchUserId = async (userid) => {
    try {
        const database = await dbCon;
        const searchId = 'SELECT userid FROM users WHERE userid = ?';
        const idExist = await database.get(searchId, userid);

        return idExist;

    } catch (error) {

    }
};

module.exports = {
    getUsers: getUsers,
    getUser: getUser,
    searchUserId: searchUserId,
    addUser: addUser,
    delUser: delUser
};