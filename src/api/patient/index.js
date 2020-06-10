const express = require('express');
const router = express.Router();
const controller = require('./patient.controller');
const { jwtAuth } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);
router.get('/:id/medical-history', jwtAuth.required, controller.getMedicalHistory);
router.get('/:id/consultation-history', jwtAuth.required, controller.getConsultationHistory);

router.post('/', jwtAuth.required, controller.create);

router.put('/:id', jwtAuth.required, controller.update);

router.delete('/:id', jwtAuth.required, controller.destroy);

module.exports = router;