const router = require('express').Router();
const controller = require('./medical-history.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', controller.getAll);
router.get('/:medicalHistoryId', jwtAuth.required, controller.getOne);
router.get('/patient/:patientId', jwtAuth.required, controller.getPatientMedicalHistory);

router.post('/past-illness/:parent/:parentId', controller.updateIllnesses);
router.post('/surgery', jwtAuth.required, controller.addSurgery);
router.post('/medication', jwtAuth.required, controller.addMedication);
router.post('/allergy', jwtAuth.required, controller.addAllergy);
router.post('/substance', jwtAuth.required, controller.addSubstance);

router.put('/surgery/:id', jwtAuth.required, controller.updateSurgery);
router.put('/medication/:id', jwtAuth.required, controller.updateMedication);
router.put('/allergy/:id', jwtAuth.required, controller.updateAllergy);
router.put('/substance/:id', jwtAuth.required, controller.updateSubstance);

router.delete('/surgery/:id', jwtAuth.required, controller.deleteSurgery);
router.delete('/medication/:id', jwtAuth.required, controller.deleteMedication);
router.delete('/allergy/:id', jwtAuth.required, controller.deleteAllergy);
router.delete('/substance/:id', jwtAuth.required, controller.deleteSubstance);

module.exports = router;