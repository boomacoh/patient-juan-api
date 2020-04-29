const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const { jwtAuth, checkPermission } = require('../../../services/auth/jwt');

router.get('/', controller.getAll);
router.get('/:userId', controller.getOne);

router.post('/request/forgot-password', controller.forgotPassword);

module.exports = router;