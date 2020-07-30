const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.get('/verify/:email', controller.verify);
router.get('/validate-email', controller.validateEmail);

router.post('/login', controller.login);
router.post('/register', controller.register);
router.post('/join', controller.join);
router.post('/reset-password', controller.resetPassword);

module.exports = router;