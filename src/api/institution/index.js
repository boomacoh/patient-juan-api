const express = require('express');
const router = express.Router();
const controller = require('./institution.controller');

router.get('/', controller.getEntries);
router.get('/:institutionId', controller.getOne);

router.post('/', controller.create);


module.exports = router;