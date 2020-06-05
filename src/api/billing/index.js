const router = require('express').Router();
const controller = require('./billing.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/:id', jwtAuth.required, controller.getOne)

router.post('/', jwtAuth.required, controller.create);
router.post('/billing-item', jwtAuth.required, controller.addBillingItem);


module.exports = router;