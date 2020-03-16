const Institution = require('../../models/institution.model');
const User = require('../../models/user.model');
const Invitation = require('../../models/invitation.model');
const UserInstitution = require('../../models/user-institution.model');
const { handleEntityNotFound, handleError, respondWithResult, handleErrorMsg } = require('../../services/handlers');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');
const decode = require('jwt-decode');

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

    await Invitation.create({
      email: email,
      institutionId: institutionId,
      access: access,
      invitedBy: invitedBy
    })
      .then(invited => {
        const invitationToken = invited.generateToken();
        const mailer = new NodeMailer(invited.email);

        const message = {
          username: invited.email.split('@')[0],
          invitedBy: invited.invitedBy,
          link: `${config.apiUrl}/invitations/verify/${invitationToken.token}`
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
  verifyEmail: async (req, res, next) => {
    const { params: { token } } = req;
    const decodedToken = decode(token);

    await User.findOne({ where: { email: decodedToken.email } })
      .then(systemUser => {

        // console.log(Object.keys(user.__proto__));

        if (!systemUser) {

          const mailer = new NodeMailer();
          const message = {
            // link: `${config.clientUrl}/signup/:email/:institutionId/:verified`
            link: `${config.clientUrl}/signup/${decodedToken.email}/${decodedToken.institutionId}/${true}`
          }

          return message;
        }

        systemUser.addInstitution(decodedToken.institutionId, { through: { access: decodedToken.access } })
          .then(success => {
            return res.status(201).send(success);
          })
          .catch(err => console.log(err));
      })
      .then(respondWithResult(res))
      .catch(err => console.log(err));
  },
  signUpInvite: async (req, res) => {

    const mailer = new NodeMailer();

    const message = {

    }
  }

}


module.exports = controller