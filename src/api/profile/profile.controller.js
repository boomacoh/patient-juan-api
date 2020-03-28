const Profile = require('./profile.model');
const User = require('../user/user/user.model');
const { handleEntityNotFound, handleError, handleErrorMsg, respondWithResult } = require('../../services/handlers');

const controller = {
  getAll: async (req, res) => {
    return await Profile.findAll()
      .then(handleEntityNotFound(res))
      .then((profiles) => {
        return res.send(profiles);
      })
      .catch(handleError(res));
  },
  getEntry: async (req, res) => {
    const { params: { profileId } } = req;
    return await Profile.findByPk(profileId)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  destroy: async (req, res) => {
    const { params: { profileId } } = req;
    return await Profile.delete({ where: { profileId: profileId } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  create: async (req, res) => {
    return await Profile.create(req.body)
      .then(profile => {
        // console.log(Object.keys(profile.__proto__));
        res.send(profile);
      })
      .catch(handleError(res));
      // .catch(handleError(res));
  }

}

module.exports = controller;