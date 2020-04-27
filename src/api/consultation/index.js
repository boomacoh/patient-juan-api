const router = require('express').Router();
const controller = require('./consultation.controller');

router.get('/', controller.getAll);
router.get('/:consultationId', controller.getOne);

router.post('/', controller.create);
router.post('/rosys/update/:group/:consultationId', controller.updateRosysGroup)


module.exports = router;