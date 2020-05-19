const router = require('express').Router();
const controller = require('./queue.controller');
const { jwtAuth, checkPermission } = require('../../services/auth/jwt');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/scopes/items', controller.getScopes);

router.put('/:id', controller.update);

router.post('/', jwtAuth.required, controller.create);

module.exports = router;