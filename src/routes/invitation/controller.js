const Invitation = require('../../models/invitation.model');
const User = require('../../models/user.model');
const Institution = require('../../models//institution.model');
const { handleEntityNotFound, handleError, handleErrorMsg, respondWithResult } = require('../../services/handlers');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
  getEntries: async (req, res) => {
    const { query: { institutionId, email } } = req;
    const condition = {};
    if (institutionId) condition['institutionId'] = institutionId;
    if (email) condition['email'] = email;

    await Invitation.findAll()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getEntry: async (req, res, next) => {
    console.log(req.body);
    const { body: { email, institutionId } } = req;
    const condition = {}
    if (email) condition['email'] = email;
    if (institutionId) condition['institutionId'] = institutionId;
    await Invitation.findOne({ where: condition })
      .then(handleEntityNotFound(res))
      .then(user => {
        if (user) return res.status(400).send(user);
        next();
      })
      .catch(handleError(res));
  }
}

module.exports = controller;