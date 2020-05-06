const User = require('../user/user.model');
const { handleEntityNotFound, respondWithResult, handleError, handleErrorMsg } = require('../../../services/handlers');
const Institution = require('../../institution/institution.model');
const Profile = require('../../profile/profile.model');
const moment = require('moment');
const UploadImage = require('../../../utility/image-uploader/upload');
const fs = require('fs');
const path = require('path');

const view = (data) => {
  const user = {
    userInfo: data.userInfo,
    institution: data.institution,
    sessionToken: data.sessionToken,
    profile: data.profile
  }

  if (!user.userInfo) delete user.userInfo;
  if (!user.institution) delete user.institutions;
  if (!user.sessionToken) delete user.sessionToken;
  if (!user.profile) delete user.profile;

  return user;
}

const controller = {
  me: async (req, res) => {
    const { payload: { userId } } = req;

    return await User
      .scope('verified', 'profile')
      .findOne({ where: { userId: userId }, include: [{ model: Institution, through: { where: { isDefault: true } } }] })
      .then(handleEntityNotFound(res))
      .then(me => {

        const data = {
          userInfo: {
            profile: me.profile ? {
              fullName: me.profile.fullName,
              specialization: me.profile.specialization,
              image: me.profile.image
            } : null,
          },
          institution: {
            institutionId: me.institutions[0].institutionId,
            registeredName: me.institutions[0].registeredName,
            memberSince: moment(me.institutions[0].user_institution.createdAt).format('MMMM DD, YYYY')
          }
        }

        res.status(200).send(view(data));
      })
      .catch(handleError(res));
  },
  changePassword: async (req, res) => {
    const { body: { currentPassword, newPassword, repeatNewPassword } } = req;
    const { payload: { userId } } = req;

    if (!oldPassword) return handleErrorMsg(res, 403, 'Current Password must not be empty!');
    if (!newPassword) return handleErrorMsg(res, 403, 'New password must not be empty!');
    if (!repeatNewPassword) return handleErrorMsg(res, 403, 'Confirm your new password!');
    if (newPassword !== repeatNewPassword) return handleErrorMsg(res, 403, 'New passwords do not match!');

    return await User.findByPk(userId)
      .then(async (user) => {
        const isCurrentValid = user.validatePassword(currentPassword);
        const isNewValid = user.validatePassword(newPassword);
        if (!isCurrentValid) res.status(400).send('Current password is incorrect!');
        if (isNewValid) res.status(400).send('New password must not be the same with the current password!');

        await user.setPassword(newPassword);
        await user.save()
          .then(() => res.json('Password updated successfully!'))
          .catch(handleError(res));
      })
      .catch(handleError(res));
  },
  updateProfile: (req, res) => {
    const { payload: { userId } } = req;
    if (req.body.userId) Reflect.deleteProperty(req.body, 'userId');

    return User
      .findByPk(userId)
      .then(user => { return user.getProfile() })
      .then(profile => {
        profile.update(req.body);
        res.status(200).json('Profile Updated');
      })
      .catch(handleError(res));
  },
  switchInstitution: async (req, res) => {
    const { payload: { userId } } = req;
    const { params: { institutionId } } = req;

    return await User
      .findOne({ where: { userId: userId }, include: [{ model: Institution, where: { institutionId: institutionId } }] })
      .then(handleEntityNotFound(res))
      .then(me => {

        const institutionInfo = {
          institutionId: me.institutions[0].institutionId,
          access: me.institutions[0].user_institution.access
        }
        const token = me.generateToken(institutionInfo);

        const data = {
          institution: {
            insitutionId: me.institutions[0].institutionId,
            registeredName: me.institutions[0].registeredName,
            memberSince: moment(me.institutions[0].user_institution.createdAt).format('MMMM DD, YYYY')
          },
          token: token
        }
        res.status(200).send(view(data));
      })
      .catch(handleError(res));
  },
  getProfile: (req, res) => {
    const { payload: { userId } } = req;

    return User.findByPk(userId)
      .then(handleEntityNotFound(res))
      .then(user => { return user.getProfile(); })
      .then(profile => {

        const data = {
          profile: {
            fullName: profile.fullName,
            firstName: profile.firstName,
            lastName: profile.lastName,
            middleName: profile.middleName,
            birthdate: profile.birthdate,
            suffix: profile.suffix,
            contactNo: profile.contactNo,
            address: profile.address,
            civilStatus: profile.civilStatus,
            sex: profile.sex,
            image: profile.image,
            specialization: profile.specialization,
            PRCLicenseNo: profile.PRCLicenseNo,
            medicalDesignation: profile.medicalDesignation,
            createdAt: moment(profile.createdAt).format('MMMM DD, YYYY'),
            updatedAt: moment(profile.updatedAt).fromNow()
          }
        }
        res.status(200).send(view(data));
      })
      .catch(handleError(res));
  },
  updateProfileImage: async (req, res) => {
    const { payload: { userId } } = req;

    return await Profile.findOne({ where: { userId: userId }, include: [{ model: User }] })
      .then(handleEntityNotFound(res))
      .then(profile => {
        if (profile.image) {
          let oldImage = profile.image.split('/');
          fs.unlinkSync(path.join(__dirname, '../../../public/images/profile/', oldImage[oldImage.length - 1]));
        }
        const upload = new UploadImage(req.file);
        upload.saveImage()
          .then(image => {
            profile.image = image.filename;
            profile.save();

            const data = {
              userInfo: {
                profile: {
                  fullName: profile.fullName,
                  specialization: profile.specialization,
                  image: profile.image
                }
              }
            }

            return res.status(200).send(view(data));
          })
          .catch(err => {
            return res.status(500).send(err);
          });
      })
      .catch(handleError(res));
  }

}


module.exports = controller;