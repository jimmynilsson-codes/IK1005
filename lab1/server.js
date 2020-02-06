const express = require('express');
const routes = require('./routes');
const app = express();
const hostname = '127.0.0.1';
const port = 1337;

app.use(express.json());
app.use(routes);

app.listen(port, (req, res) => {
    console.log(`Server online: http://${hostname}:${port}`);
});