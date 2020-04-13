const router = require('express').Router();
const controller = require('./medical-history.controller');


router.get('/', controller.getAll);



module.exports = router;