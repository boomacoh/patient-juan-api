const express = require('express');
const router = express.Router();
const controller = require('./patient.controller');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.post('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;