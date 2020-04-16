const router = require('express').Router();
const controller = require('./medical-history.controller');

router.get('/', controller.getAll);
router.get('/:medicalHistoryId', controller.getOne);
router.get('/patient/:patientId', controller.getPatientMedicalHistory);
router.get('/test/test/test', controller.updatePastMedicalHistory);

module.exports = router;