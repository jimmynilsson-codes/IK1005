const express = require('express');
const hostname = '127.0.0.1';
const port = 8000;
const artRoute = require('./controller/routes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.use(artRoute);

app.listen(port, hostname, () => {
    console.log(`Server running on ${hostname}:${port}`);
});

