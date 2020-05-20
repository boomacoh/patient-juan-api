const express = require('express');
const router = express.Router();
const controller = require('./institution.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', controller.getEntries);
router.get('/:id', controller.getOne);
router.get('/billables/:id', jwtAuth.required, controller.getBillables);
router.get('/invitations/:id', jwtAuth.required, controller.getInvitations);

router.post('/', controller.create);


module.exports = router;