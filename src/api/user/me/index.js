const express = require('express');
const router = express.Router();
const controller = require('./me.controller');
const { jwtAuth, checkPermission } = require('../../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.me);
router.get('/switch/:institutionId', controller.switchInstitution);

router.post('/change-password', jwtAuth.required, controller.changePassword);
router.put('/update', jwtAuth.required, controller.updateProfile);

module.exports = router;