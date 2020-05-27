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
    token: data.token,
    profile: data.profile
  }

  if (!user.userInfo) delete user.userInfo;
  if (!user.institution) delete user.institutions;
  if (!user.token) delete user.token;
  if (!user.profile) delete user.profile;

  return user;
}

const controller = {
  me: (req, res) => {
    const { payload: { userId } } = req;
    console.log(req.payload);

    return User
      .scope('verified', 'profile')
      .findOne({ where: { id: userId }, include: [{ model: Institution, through: { where: { isDefault: true } } }] })
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
            institutionId: me.institutions[0].id,
            registeredName: me.institutions[0].registeredName,
            memberSince: moment(me.institutions[0].user_institution.createdAt).format('MMMM DD, YYYY')
          }
        }

        res.status(200).send(view(data));
      })
      .catch(handleError(res));
  },
  getInstitutions: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.getInstitutions())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getInstitutionAccess: (req, res) => {
    const { payload: { userId } } = req;
    const { query: { institutionId } } = req;

    return User
      .findByPk(userId, { include: [{ model: Institution, where: { id: institutionId } }] })
      .then(handleEntityNotFound(res, 'User'))
      .then(user => res.send(user.institutions[0].user_institution.access))
      .catch(handleError(res));
  },
  changePassword: (req, res) => {
    const { body: { currentPassword, newPassword, repeatNewPassword } } = req;
    const { payload: { userId } } = req;

    if (!currentPassword) return handleErrorMsg(res, 403, 'Current Password must not be empty!');
    if (!newPassword) return handleErrorMsg(res, 403, 'New password must not be empty!');
    if (!repeatNewPassword) return handleErrorMsg(res, 403, 'Confirm your new password!');
    if (newPassword !== repeatNewPassword) return handleErrorMsg(res, 403, 'Password does not match!');

    return User.
      findByPk(userId)
      .then(user => {
        if (user.validatePassword(currentPassword)) return res.status(400).send('Current password is incorrect!');
        if (user.validatePassword(newPassword)) return res.status(400).send('New password must not be the same with the current password!');

        user.setPassword(newPassword);
        user.save()
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
      .then(user => user.getProfile())
      .then(profile => {
        profile.update(req.body);
        res.status(200).json('Profile Updated');
      })
      .catch(handleError(res));
  },
  getProfile: (req, res) => {
    const { payload: { userId } } = req;

    return User
      .findByPk(userId)
      .then(handleEntityNotFound(res))
      .then(user => user.getProfile())
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
  updateProfileImage: (req, res) => {
    const { payload: { userId } } = req;

    return Profile.findOne({ where: { userId: userId }, include: [{ model: User }] })
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
  },
  getPatients: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.getPatients())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createPatient: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.createPatient(req.body))
      .then(patient => {
        patient.createMedicalHistory()
          .then(mh => {
            mh.createPastMedicalHistory();
            mh.createFamilyMedicalHistory();
            mh.createSocialPersonalHistory();
          })
          .catch(handleError(res));
        return patient;
      })
      .then(respondWithResult(res))
      .catch(handleError(res))
  }

}


module.exports = controller;