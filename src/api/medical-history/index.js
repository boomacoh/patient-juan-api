const router = require('express').Router();
const controller = require('./medical-history.controller');

router.get('/', controller.getAll);
router.get('/:medicalHistoryId', controller.getOne);
router.get('/pmh/pmh', controller.pmh);

module.exports = router;