const sqlite = require('sqlite');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const saltrounds = 10;

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

selectUsers = async () => {
    try {
        const db = await dbCon;
        const selectAllUsers = 'SELECT email, firstname, lastname, password, id FROM users';
        const allUserRows = await db.all(selectAllUsers);

        return allUserRows;
    } catch (error) {
        throw new Error(error);
    }
}

selectUser = async (userId) => {
    try {
        const db = await dbCon;
        const selectUser = 'SELECT email, firstname, lastname, password, id FROM users WHERE id = ?';
        const userRow = db.get(selectUser, userId);

        return userRow;
    } catch (error) {
        throw new Error(error);
    }
};

insertUser = async (email, firstname, lastname, password) => {
    try {
        const db = await dbCon;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            const insertUser = 'INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?, ?)';
            await db.run(insertUser, email, firstname, lastname, hash);
        });
    } catch (error) {
        throw new Error(error);
    }
};

deleteUser = async (userId) => {
    try {
        const db = await dbCon;
        const deleteUser = 'DELETE FROM users WHERE id = ?';

        await db.run(deleteUser, userId);
    } catch (error) {
        throw new Error(error);
    }
};

updateUser = async (email, firstname, lastname, password, userId) => {
    try {
        const db = await dbCon;
        const updateUser = 'UPDATE users SET email = ?, firstname = ?, lastname = ?, password = ? WHERE id = ?';

        await db.run(updateUser, email, firstname, lastname, password, userId);
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    getUsers: selectUsers,
    getUser: selectUser,
    addUser: insertUser,
    delUser: deleteUser,
    updUser: updateUser,
}