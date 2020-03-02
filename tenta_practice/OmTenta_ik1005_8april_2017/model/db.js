const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbCon = sqlite.open('./model/database.db', { Promise });

const getArtworks = async () => {
    try {
        const sqlQuery = 'SELECT id, artist, painting from artwork';
        const db = await dbCon;
        return db.all(sqlQuery);
    } catch (error) {
        console.log(error);
    }
}

const getMaxBid = async (id) => {
    try {
        const sqlQuery = 'SELECT id, artwork_id, max(bid) maxbid from bids where artwork_id = ?';
        const db  = await dbCon;
        return db.get(sqlQuery, id);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getArtworks : getArtworks,
    getMaxBid : getMaxBid
}