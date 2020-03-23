const User = require('../user/user.model');
const { handleEntityNotFound, respondWithResult, handleError, handleErrorMsg } = require('../../../services/handlers');
const Institution = require('../../institution/institution.model');
const Profile = require('../../profile/profile.model');

const view = (data, profile, institution) => {
  const user = {
    userId: data.userId,
    profile: data.profile,
    institution: {
      institutionId: data.institutionId,
      access: data.access
    }
  }

  if (!profile) delete me.profile;
  if (!institution) delete me.institutions;

  return user;
}

const controller = {
  me: async (req, res) => {
    const { payload: { userId } } = req;

    return await User.findOne({ where: { userId: userId, verified: true }, include: [Profile, Institution] })
      .then(handleEntityNotFound(res))
      .then(me => {

        data = {
          userId: me.userId,
          profile: me.profile ? { firstName: me.profile.firstName, lastName: me.profile.lastName } : null,
          institutionId: me.institutions[0].institutionId,
          access: me.institutions[0].user_institution.access
        }

        res.status(200).send(view(data, true, true));

      })
      .catch(err => console.log(err));
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
  updateProfile: async (req, res) => {
    const { payload: { userId } } = req;
    if (req.body.userId) Reflect.deleteProperty(req.body, 'userId');

    return await User.update(req.body, { where: { userId: userId } })
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 202))
      .catch(handleError(res))
  }
}


module.exports = controller;