const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 1337;
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.listen(port, (req, res) => {
    console.log(`Server running on http://${hostname}:${port}`);
});