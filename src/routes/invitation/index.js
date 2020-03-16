const express = require('express');
const router = express.Router();
const controller = require('./controller');
const association = require('./association-controller');
const { auth, checkPermission } = require('../../services/auth/jwt');
const globalController = require('../../utility/controllers');


router.get('/', auth.optional, controller.getEntries);
router.get('/:userId', auth.optional, controller.getEntry);


router.get('/verify/:token', auth.optional, globalController.checkTokenExpiry, association.verifyEmail);
router.post('/', auth.optional, association.checkEmailInClinic, association.checkInInvites, association.sendInvite);

module.exports = router;