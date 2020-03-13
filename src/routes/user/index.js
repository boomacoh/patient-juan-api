const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authentication = require('./authentication.js');
const { auth, checkPermission } = require('../../services/auth/jwt');

router.post('/auth/login', authentication.login);
router.post('/auth/register', authentication.register);

router.get('/', auth.required, checkPermission([['system']]), controller.getEntries);
router.get('/:userId', auth.required, checkPermission([['system']]), controller.getEntry);

module.exports = router;