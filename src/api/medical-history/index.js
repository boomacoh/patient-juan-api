const router = require('express').Router();
const controller = require('./medical-history.controller');

router.get('/', controller.getAll);
router.get('/:medicalHistoryId', controller.getOne);

module.exports = router;