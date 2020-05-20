const express = require('express');
const router = express.Router();
const controller = require('./patient.controller');
const { jwtAuth } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);
router.post('/', jwtAuth.required, controller.create);
router.put('/:id', jwtAuth.required, controller.update);
router.delete('/:id', jwtAuth.required, controller.destroy);

module.exports = router;