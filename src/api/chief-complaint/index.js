const express = require('express');
const router = express.Router();
const controller = require('./chief-complaint.controller');

router.get('/', controller.getAll);

module.exports = router;