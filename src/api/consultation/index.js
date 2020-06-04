const router = require('express').Router();
const controller = require('./consultation.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);
router.get('/history/history', controller.getHistory);
router.get('/find/options', jwtAuth.required, controller.find);
router.get('/association/:id/:association', controller.getAssociation);
router.get('/billing/:id', jwtAuth.required, controller.getBilling);

router.put('/:id', jwtAuth.required, controller.update);

router.post('/', jwtAuth.required, controller.create);
router.post('/hpis/:id', controller.updateHpis);
router.post('/rosys/:id', jwtAuth.required, controller.updateRosys);
router.post('/rosys/:group/:id', jwtAuth.required, controller.updateRosysGroup);
router.post('/physical-exam/:id', jwtAuth.required, controller.updatePhysicalExam);
router.post('/plan/:id', jwtAuth.required, controller.updateplan);


module.exports = router;