const router = require('express').Router();
const controller = require('./medical-history.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);

router.post('/obh', jwtAuth.required, controller.createObGyneHistory);

router.post('/surgery', jwtAuth.required, controller.addSurgery);
router.post('/medication', jwtAuth.required, controller.addMedication);
router.post('/allergy', jwtAuth.required, controller.addAllergy);

router.put('/surgery/:id', jwtAuth.required, controller.updateSurgery);
router.put('/medication/:id', jwtAuth.required, controller.updateMedication);
router.put('/allergy/:id', jwtAuth.required, controller.updateAllergy);
router.put('/sph/:id', jwtAuth.required, controller.updateSph);
router.put('/obh/:id', jwtAuth.required, controller.updateObGyneHistory);

router.delete('/surgery/:id', jwtAuth.required, controller.deleteSurgery);
router.delete('/medication/:id', jwtAuth.required, controller.deleteMedication);
router.delete('/allergy/:id', jwtAuth.required, controller.deleteAllergy);

module.exports = router;