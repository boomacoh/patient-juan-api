const Invitation = require('./invitation.model');
const User = require('../user/user/user.model');
const Institution = require('../institution/institution.model');
const { handleEntityNotFound, handleError, handleErrorMsg, respondWithResult } = require('../../services/handlers');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
  getEntries: async (req, res) => {
    const { query: { email, institutionId, invitationId } } = req;
    const condition = {}

    if (invitationId) condition['invitationId'] = invitationId;
    if (email) condition['email'] = email;
    if (institutionId) condition['institutionId'] = institutionId;

    await Invitation.findAll({ where: { condition } })
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getEntry: async (req, res, next) => {

    await Invitation.findByPk()
      .then(handleEntityNotFound(res))
      .then(user => {
        if (user) return res.send(user);
      })
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const { body: { email, institutionId, clinicName, access, invitedBy } } = req;

    const newInvite = await Invitation.build({
      email: email,
      institutionId: institutionId,
      access: access,
      invitedBy: invitedBy
    });

    let token = await newInvite.generateToken();
    newInvite.token = token.token;

    await newInvite.save()
      .then(invited => {
        const mailer = new NodeMailer(invited.email);

        const x = access.map(a => {
          if (a === 'system') return 'Administrator';
          if (a === 'clinic:doctor') return 'Physician';
          if (a === 'clinic:staff') return 'Clinic Staff';
        });

        const message = {
          username: invited.email.split('@')[0],
          invitedBy: invited.invitedBy,
          link: `${config.apiUrl}/invitations/verify/${invited.invitationId}`,
          clinicName: clinicName,
          access: x
        }

        mailer
          .setTemplate('invitation', message)
          .setSubject(`Invitation from ${invitedBy}`)
          .sendHtml();

        return message;
      })
      .then(respondWithResult(res, 201))
      .catch(err => console.log(err));
  },
  destroy: async (req, res) => {
    
  }
}

module.exports = controller;