const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const globalController = require('../../../utility/controllers');

//auth
router.get('/verify/:token', globalController.checkTokenExpiry, controller.verify);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/join', controller.join);

module.exports = router;