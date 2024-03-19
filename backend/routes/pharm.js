const { Router } = require('express');

const pharm = Router();
const {
    getPharm,
    createPharm,
    updatePharm,
    deletePharm,
    searchPharm
} = require('../controls/pharm')

pharm.get('/getPharm', getPharm);
pharm.post('/createPharm', createPharm);
pharm.put('/updatePharm:/id', updatePharm);
pharm.delete('/deletePharm:/id', deletePharm);
pharm.get('/searchPharm', searchPharm);

module.exports = pharm