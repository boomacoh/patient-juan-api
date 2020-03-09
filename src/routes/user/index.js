const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/auth/login', controller.login);
router.post('/auth/register', controller.register);
router.get('/', controller.getEntries);



module.exports = router;