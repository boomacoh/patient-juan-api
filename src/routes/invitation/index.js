const express = require('express');
const router = express.Router();
const controller = require('./controller');
const association = require('./association-controller');
const { auth, checkPermission } = require('../../services/auth/jwt');


router.get('/', auth.optional, controller.getEntries);
router.get('/:userId', auth.optional, controller.getEntry);



router.get('/verify/:invitationToken', auth.optional, association.verify);
router.post('/', auth.optional, association.checkEmailInClinic, association.checkInInvites, association.sendInvite);

module.exports = router;