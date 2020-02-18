const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./h06jimni_db.db', { Promise });

//function to get password from table
const checkLogin = async (email) => {
    try {
        const db = await dbCon;
        const selectUserQuery = 'SELECT password FROM users WHERE email = ?';

        const password = await db.get(selectUserQuery, email);
        return password;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    checkLogin: checkLogin,
}