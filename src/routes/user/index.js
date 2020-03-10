const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkPermission } = require('../../services/auth/jwt');

router.post('/auth/login', controller.login);
router.post('/auth/register', controller.register);
router.get('/', auth.required, controller.getEntries);
router.get('/:userId', controller.getEntry);

module.exports = router;