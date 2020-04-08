const router = require('express').Router();
const controller = require('./queue.controller');

router.get('/', controller.getAll);
router.get('/:queueId', controller.getOne);
router.post('/', controller.create);


module.exports = router;