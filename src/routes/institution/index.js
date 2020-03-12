const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.getEntries);
router.get('/:institutionId', controller.getEntry);

router.post('/', controller.create);

module.exports = router;