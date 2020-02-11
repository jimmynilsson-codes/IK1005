const express = require('express');
const app = express();
const users = require('./users');

const hostname = '127.0.0.1';
const port = 1337;

app.use(express.json());
app.use(users);

app.listen(port, (req, res) => {
    console.log(`Server running on http://${hostname}:${port}`);
});