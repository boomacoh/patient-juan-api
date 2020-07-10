const router = require('express').Router();
const controller = require('./consultation.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);

router.put('/:id', jwtAuth.required, controller.update);

router.post('/', jwtAuth.required, controller.create);
router.post('/:id/hpis', controller.updateHpis);
router.post('/:id/ros', jwtAuth.required, controller.updateRosGroup);
router.post('/:id/physical-exam', jwtAuth.required, controller.updatePhysicalExam);
router.post('/:id/diagnostics', jwtAuth.required, controller.updateDiagnostic);
router.post('/:id/plan', jwtAuth.required, controller.updateplan);

module.exports = router;