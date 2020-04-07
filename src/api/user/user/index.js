const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const { jwtAuth, checkPermission } = require('../../../services/auth/jwt');

router.get('/', jwtAuth.required, checkPermission([['system']]), controller.getEntries);
router.get('/:userId', jwtAuth.required, checkPermission([['system']]), controller.getEntry);

router.post('/forgot-password', controller.forgotPassword);

module.exports = router;