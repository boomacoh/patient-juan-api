const express = require('express');
const router = express.Router();
const controller = require('./main.controller');

router.get('/', controller.home);
router.get('/redirect/:email', controller.toClient);
router.get('/request-reset-password', controller.requestResetPassword);

module.exports = router;