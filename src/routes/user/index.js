const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authentication = require('./authentication.js');
const me = require('./me.controller');
const { auth, checkPermission } = require('../../services/auth/jwt');
const globalController = require('../../utility/controllers');

//me
router.get('/me', auth.required, me.me);
router.post('/me/change-password', auth.required, me.changePassword);
router.put('/me/update', auth.required)

router.get('/', auth.required, checkPermission([['system']]), controller.getEntries);
router.get('/:userId', auth.required, checkPermission([['system']]), controller.getEntry);

//auth
router.get('/auth/verify/:email', globalController.checkTokenExpiry, authentication.verify);
router.post('/auth/login', authentication.login);
router.post('/auth/register', authentication.register);
router.post('/auth/join', authentication.join);




module.exports = router;