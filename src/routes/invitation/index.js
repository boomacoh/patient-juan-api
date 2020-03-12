const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { auth, checkPermission } = require('../../services/auth/jwt');


router.get('/', auth.optional, controller.getEntries);
// router.post('/', auth.optional, controller.invite, controller.accept);
router.get('/accept/:invitationToken', auth.optional, controller.accept);
router.post('/test-on-next', controller.nextOne, controller.nextTwo, controller.nextThree);

router.get('/xx', controller.checkInUsers);

module.exports = router;