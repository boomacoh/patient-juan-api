const router = require('express').Router();
const controller = require('./queue.controller');

router.get('/', controller.getAll);
router.get('/:queueId', controller.getOne);
router.get('/scopes/items', controller.getScopes);
router.put('/:queueId', controller.update);
router.post('/', controller.create);


module.exports = router;