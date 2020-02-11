const users = require('express').Router();
const db = require('./db');

users.get('/', (req, res) => {
    res.json({ admin: 'h06jimni@du.se' });
});

users.get('/getusers', async (req, res) => {
    try {
        const allUserRows = await db.getUsers();
        res.json(allUserRows);
    } catch (error) {
        res.json(error);
    }
});

users.get('/getuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const idExist = await db.searchUserId(userId);
        if (idExist) {
            const userRow = await db.getUser(userId);

            res.json(userRow);
        } else {
            res.json({ status: `User with id ${userId} does not exist.` });
        }
    } catch (error) {
        res.json(error);
    };
});

users.post('/adduser/', async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = generateUsername(firstname, lastname);
    const email = username + '@du.se';
    const password = req.body.password;

    try {
        await db.addUser(firstname, lastname, email, username, password);
        res.json({ status: 'insert ok!' });
    } catch (error) {
        res.json(error);
    }
});

users.delete('/deluser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const idExist = await db.searchUserId(userId);

        if (idExist) {
            await db.delUser(userId);
            res.json({ status: `User with id ${userId} was deleted.` });
        } else {
            res.json({ status: `User with id ${userId} does not exist.` });
        }
    } catch (error) {
        console.log(error);
        res.json({status : 'NOK'});
    }
})

generateUsername = (firstname, lastname) => {
    const username = firstname.trim().substr(0, 3) + lastname.trim().substr(0, 3);
    return username;
};

module.exports = users; 