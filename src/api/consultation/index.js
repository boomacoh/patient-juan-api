const router = require('express').Router();
const controller = require('./consultation.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');


router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);

router.put('/:id', jwtAuth.required, controller.update);
router.put('/:id/labs-and-imaging', jwtAuth.required, controller.updateLabsAndImaging);
router.put('/:id/plan/drugs', jwtAuth.required, controller.updatePlanDrug);
router.put('/:id/plan/diagnostic-tests', jwtAuth.required, controller.updatePlanTest)

router.post('/', jwtAuth.required, controller.create);
router.post('/:id/hpis', controller.updateHpis);
router.post('/:id/ros', jwtAuth.required, controller.updateRosGroup);
router.post('/:id/physical-exam', jwtAuth.required, controller.updatePhysicalExam);
router.post('/:id/plan', jwtAuth.required, controller.updateplan);
router.post('/:id/labs-and-imaging', jwtAuth.required, controller.addLabsAndImaging);
router.post('/:id/plan/drugs', jwtAuth.required, controller.addPlanDrug);
router.post('/:id/plan/diagnostic-tests', jwtAuth.required, controller.addPlanTest);

router.delete('/:id/labs-and-imaging', jwtAuth.required, controller.deleteLabsAndImaging);
router.delete('/:id/plan/drugs', jwtAuth.required, controller.deletePlanDrug);
router.delete('/:id/plan/diagnostic-tests', jwtAuth.required, controller.deletePlanTest)

module.exports = router;