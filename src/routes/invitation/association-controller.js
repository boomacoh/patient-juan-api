const Institution = require('../../models/institution.model');
const User = require('../../models/user.model');
const Invitation = require('../../models/invitation.model');
const { handleEntityNotFound, handleError, respondWithResult, handleErrorMsg } = require('../../services/handlers');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
  checkEmailInClinic: async (req, res, next) => {
    const { body: { email, institutionId } } = req;

    await Institution.findOne({ where: { institutionId: institutionId }, attributes: ['registeredName'], include: [{ model: User, attributes: ['email'], where: { email: email } }] })
      .then(results => {
        if (!results) return next();
        next('User already exists in this clinic');
      })
      .catch(err => console.log(err));
  },
  checkInInvites: async (req, res, next) => {
    const { body: { email, institutionId } } = req

    await Invitation.findOne({ where: { email: email, institutionId: institutionId } })
      .then(result => {
        if (!result) return next();
        next('User is already invited!');
      })
      .catch(err => console.log(err));
  },
  sendInvite: async (req, res) => {
    const { body: { email, institutionId, clinicName, access, invitedBy } } = req;

    const invitation = await Invitation.build({
      email: email,
      institutionId: institutionId,
      access: access,
      invitedBy: invitedBy
    });

    const invitationToken = await invitation.generateToken();

    return await invitation.save()
      .then(invited => {

        const mailer = new NodeMailer(invited.email);

        const message = {
          username: invited.email.split('@')[0],
          invitedBy: invited.invitedBy,
          link: `${config.inviteVerificationLink}/${invitationToken.token}`
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
  verify: async (req, res) => {
    console.log('invitation verified!!!');
  }

}


module.exports = controller