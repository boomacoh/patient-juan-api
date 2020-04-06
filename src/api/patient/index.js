const express = require('express');
const router = express.Router();
const controller = require('./patient.controller');

router.get('/', controller.getAll);
router.get('/:patientId', controller.getOne);
router.post('/', controller.create);
router.put('/:patientId', controller.update);
router.delete('/:patientId', controller.destroy);
router.get('/tests', controller.getTests);

module.exports = router;