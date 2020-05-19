const express = require('express');
const router = express.Router();
const controller = require('./invitation.controller');
const association = require('./association-controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.optional, controller.getEntries);
router.get('/:id', jwtAuth.optional, controller.getEntry);


router.get('/verify/:id', jwtAuth.optional, association.verify, association.assign);
router.post('/', jwtAuth.optional, association.checkEmailInClinic, association.checkInInvites, controller.create);

module.exports = router;