const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkPermission } = require('../../services/auth/jwt');


router.get('/', auth.optional, controller.getEntries);
router.post('/', auth.optional, controller.invite);
router.get('/accept/:invitationToken', auth.optional, controller.accept)

module.exports = router;