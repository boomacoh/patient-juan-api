const router = require('express').Router();
const controller = require('./billing.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne)
router.get('/:id/billing-items', jwtAuth.required, controller.getBillingItems);

router.put('/billing-items/:id', jwtAuth.required, controller.updateBillingItem);

router.post('/', jwtAuth.required, controller.create);
router.post('/billing-items', jwtAuth.required, controller.createBillingItem)

router.delete('/billing-items/:id', jwtAuth.required, controller.deleteBillingItem);


module.exports = router;