const router = require('express').Router();
const controller = require('./consultation.controller');

router.get('/', controller.getAll);
router.get('/:consultationId', controller.getOne);

router.post('/', controller.create);

router.get('/hpi/create', controller.createHpis);

module.exports = router;