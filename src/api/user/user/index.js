const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const { auth, checkPermission } = require('../../../services/auth/jwt');

router.get('/', auth.required, checkPermission([['system']]), controller.getEntries);
router.get('/:userId', auth.required, checkPermission([['system']]), controller.getEntry);

module.exports = router;