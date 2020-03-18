const express = require('express');
const router = express.Router();
const controller = require('./controller');
const authentication = require('./authentication.js');
const { auth, checkPermission } = require('../../services/auth/jwt');
const globalController = require('../../utility/controllers');


router.get('/', auth.required, checkPermission([['system']]), controller.getEntries);
router.get('/:userId', auth.required, checkPermission([['system']]), controller.getEntry);

//auth
router.get('/auth/verify/:email', globalController.checkTokenExpiry, authentication.verify);
router.post('/auth/login', authentication.login);
router.post('/auth/register', authentication.register);


module.exports = router;