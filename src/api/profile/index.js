const router = require('express').Router();
const controller = require('./profile.controller');
const {jwtAuth, checkPermission} = require('../../services/auth/jwt')

router.get('/', controller.getAll);
router.get('/:profileId', controller.getEntry);
router.delete('/:profileId', controller.destroy);
router.post('/', controller.create);

module.exports = router;