const express = require('express');
const router = express.Router();
const controller = require('./me.controller');
const { jwtAuth, checkPermission } = require('../../../services/auth/jwt');
const upload = require('../../../utility/image-uploader/multer');

router.get('/', jwtAuth.required, controller.me);
router.get('/switch/:institutionId', jwtAuth.required, controller.switchInstitution);
router.get('/profile', jwtAuth.required, controller.getProfile);

router.post('/change-password', jwtAuth.required, controller.changePassword);
router.put('/update', jwtAuth.required, controller.updateProfile);
router.post('/update/image', jwtAuth.required, upload.single('profileImage'), controller.updateProfileImage);

module.exports = router;