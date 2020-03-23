const express = require('express');
const router = express.Router();
const controller = require('./main.controller');

router.get('/', controller.home);

module.exports = router;