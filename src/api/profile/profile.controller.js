const Profile = require('./profile.model');
const User = require('../user/user/user.model');
const { handleEntityNotFound, handleError, handleErrorMsg, respondWithResult } = require('../../services/handlers');

const controller = {
  getAll: (req, res) => {
    return Profile.
      findAll()
      .then(handleEntityNotFound(res))
      .then((profiles) => {
        return res.send(profiles);
      })
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Profile.
      findByPk(id)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getByUser: (req, res) => {
    const { params: { id } } = req;
    return Profile
      .findOne({ where: { userId: id } })
      .then(handleEntityNotFound(res, 'Profile'))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  update: (req, res) => {
    const { params: { id } } = req;
    return Profile
      .update(req.body, { where: { id: id } })
      .then(() => { return Profile.findByPk(profileId) })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  create: (req, res) => {
    return Profile
      .create(req.body)
      .then(profile => {
        // console.log(Object.keys(profile.__proto__));
        res.send(profile);
      })
      .catch(handleError(res));
  },
  destroy: (req, res) => {
    const { params: { id } } = req;
    return Profile
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
}

module.exports = controller;