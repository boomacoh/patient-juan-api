const router = require('express').Router();
const controller = require('./profile.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt')

router.get('/', jwtAuth.required, controller.getAll);
router.get('/:id', jwtAuth.required, controller.getOne);
router.get('/user/:id', jwtAuth.required, controller.getByUser);

router.put('/:id', jwtAuth.required, controller.update);

router.post('/', controller.create);

router.delete('/:id', jwtAuth.required, controller.destroy);

module.exports = router;