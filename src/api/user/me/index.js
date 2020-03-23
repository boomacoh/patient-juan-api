const express = require('express');
const router = express.Router();
const controller = require('./me.controller');
const { auth, checkPermission } = require('../../../services/auth/jwt');

router.get('/', auth.required, controller.me);
router.post('/change-password', auth.required, controller.changePassword);
router.put('/update', auth.required, controller.updateProfile);

module.exports = router;