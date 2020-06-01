const router = require('express').Router();
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');
const controller = require('./billable.controller');

router.get('/', jwtAuth.required, controller.getBillables);
router.get('/packages', jwtAuth.required, controller.getPackages);

router.put('/:id', jwtAuth.required, controller.updateBillable);
router.put('/packages/:id', jwtAuth.required, controller.updatePackage);

router.post('/', jwtAuth.required, controller.createBillable);
router.post('/packages', jwtAuth.required, controller.createPackage);

router.delete('/:id', jwtAuth.required, controller.deleteBillable);
router.delete('/packages/:id', jwtAuth.required, controller.deletePackage);

module.exports = router;