const express = require('express');
const router = express.Router();
const controller = require('./controller');
const association = require('./association.controller');

router.get('/', controller.getEntries);
router.get('/:institutionId', controller.getEntry);

router.post('/', controller.create);

router.get('/assignment/test', association.getEntry);

module.exports = router;