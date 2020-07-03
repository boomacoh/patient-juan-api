const router = require('express').Router();
const controller = require('./medical-history.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);

router.post('/medical-conditions', jwtAuth.required, controller.addMedicalCondition);
router.post('/medications', jwtAuth.required, controller.addMedication);
router.post('/childhood-diseases', jwtAuth.required, controller.addChildhoodDisease);
router.post('/hospitalizations', jwtAuth.required, controller.addHospitalization);
router.post('/surgeries', jwtAuth.required, controller.addSurgery);
router.post('/injuries', jwtAuth.required, controller.addInjury);
router.post('/blood-transfusions', jwtAuth.required, controller.addBloodTransfusion);
router.post('/allergies', jwtAuth.required, controller.addAllergy);
router.post('/psychiatrics', jwtAuth.required, controller.addPsychiatric);

router.put('/medical-conditions/:id', jwtAuth.required, controller.updateMedicalCondition);
router.put('/medications/:id', jwtAuth.required, controller.updateMedication);
router.put('/childhood-diseases/:id', jwtAuth.required, controller.updateChildhoodDisease);
router.put('/hospitalizations/:id', jwtAuth.required, controller.updateHospitalization);
router.put('/surgeries/:id', jwtAuth.required, controller.updateSurgery);
router.put('/injuries/:id', jwtAuth.required, controller.updateInjury);
router.put('/blood-transfusions/:id', jwtAuth.required, controller.updateBloodTransfusion);
router.put('/allergies/:id', jwtAuth.required, controller.updateAllergy);
router.put('/psychiatrics/:id', jwtAuth.required, controller.updatePsychiatric);

router.put('/sph/:id', jwtAuth.required, controller.updateSph);
router.put('/obh/:id', jwtAuth.required, controller.updateObGyneHistory);

router.delete('/surgeries/:id', jwtAuth.required, controller.deleteSurgery);
router.delete('/medications/:id', jwtAuth.required, controller.deleteMedication);
router.delete('/allergies/:id', jwtAuth.required, controller.deleteAllergy);

module.exports = router;