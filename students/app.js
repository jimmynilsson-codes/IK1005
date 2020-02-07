const express = require('express');
const app = express();
const routes = require('./routes');

const hostname = '127.0.0.1';
const port = 7331;

app.use(express.json());
app.use(routes);


app.listen(port, (req, res) => {
    console.log(`Server online @ ${hostname}:${port}`);
});
