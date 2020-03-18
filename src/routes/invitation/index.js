const express = require('express');
const router = express.Router();
const controller = require('./controller');
const association = require('./association-controller');
const { auth, checkPermission } = require('../../services/auth/jwt');

router.get('/', auth.optional, controller.getEntries);
router.get('/:invitationId', auth.optional, controller.getEntry);


router.get('/verify/:invitationId', auth.optional, association.verify, association.assign);
router.post('/', auth.optional, association.checkEmailInClinic, association.checkInInvites, controller.create);

module.exports = router;