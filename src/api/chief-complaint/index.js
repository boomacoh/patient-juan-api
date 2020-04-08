const express = require('express');
const router = express.Router();
const controller = require('./chief-complaint.controller');

router.get('/', controller.getAll);
router.get('/:chiefComplaintId', controller.getOne);
router.post('/', controller.create);
router.put('/:chiefComplaintId', controller.update);
router.delete('/:chiefComplaintId', controller.destroy);

module.exports = router;