const express = require('express');
const router = express.Router();
const controller = require('./me.controller');
const { jwtAuth, checkPermission } = require('../../../services/auth/jwt');
const upload = require('../../../utility/image-uploader/multer');

router.get('/', jwtAuth.required, controller.me);
router.get('/profile', jwtAuth.required, controller.getProfile);
router.get('/institutions', jwtAuth.required, controller.getInstitutions);
router.get('/institutions/access', jwtAuth.required, controller.getInstitutionAccess);

router.put('/profile', jwtAuth.required, controller.updateProfile);

router.post('/change-password', jwtAuth.required, controller.changePassword);
router.post('/update/image', jwtAuth.required, upload.single('profileImage'), controller.updateProfileImage);

module.exports = router;