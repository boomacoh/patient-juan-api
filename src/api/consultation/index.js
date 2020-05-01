const router = require('express').Router();
const controller = require('./consultation.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:consultationId', jwtAuth.required, controller.getOne);
router.get('/find/options', jwtAuth.required, controller.find);
router.get('/association/:consultationId/:association', controller.getAssociation);


router.post('/', jwtAuth.required, controller.create);
router.post('/hpis/:consultationId', controller.updateHpis);
router.post('/rosys/:consultationId', jwtAuth.required, controller.updateRosys);
router.post('/rosys/:group/:consultationId', jwtAuth.required, controller.updateRosysGroup);
// router.post('/physical-exam/:consultationId')


module.exports = router;