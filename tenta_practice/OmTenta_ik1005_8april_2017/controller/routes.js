const routes = require('express').Router();
const db = require('../model/db');

routes.get('/', async (req, res) => {
    try {
        const artworks = await db.getArtworks();
        res.json(artworks);
    } catch (error) {
        res.json(error);
    }
});

routes.get('/maxbid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const maxbid = await db.getMaxBid(id);
        res.json(maxbid);
    } catch (error) {
        res.json(error);
    }
});

module.exports = routes;