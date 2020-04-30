const router = require('express').Router();
const controller = require('./consultation.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:consultationId', jwtAuth.required, controller.getOne);
router.get('/find/options', jwtAuth.required, controller.find);
router.get('/association/:consultationId', controller.getAssociation);

router.put('/rosys/update/:consultationId', jwtAuth.required, controller.updateRosys);

router.post('/', jwtAuth.required, controller.create);
router.post('/update/hpis/:consultationId', controller.updateHpis);
router.post('/rosys/update/:group/:consultationId', jwtAuth.required, controller.updateRosysGroup)


module.exports = router;