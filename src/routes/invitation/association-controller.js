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
        next('User is already a member of this clinic');
      })
      .catch(err => console.log(err));
  },
  checkInInvites: async (req, res, next) => {
    const { body: { email, institutionId } } = req

    await Invitation
      .scope('pending')
      .findOne({ where: { email: email, institutionId: institutionId } })
      .then(result => {
        if (!result) {
          return next();
        }
        next('User already has a pending invitation from this clinic!');
      })
      .catch(err => console.log(err));
  },
  verify: async (req, res, next) => {
    const { params: { invitationId } } = req;

    await Invitation
      .scope('pending')
      .findByPk(invitationId)
      .then(handleEntityNotFound(res))
      .then(invitation => {
        res.locals.invitation = invitation;

        const decodedToken = decode(invitation.token);
        const today = parseInt(new Date().getTime() / 1000, 10);

        if (decodedToken.exp < today) {
          invitation.status = 'expired';
          invitation.save();
          return res.render('error', { message: 'This Invitation has expired or invalid!', code: 500 });
        }
        return next()
      })
      .catch(err => console.log(err));
  },
  assign: async (req, res, next) => {
    const invitation = res.locals.invitation;

    await User.findOne({ where: { email: invitation.email } })
      .then(systemUser => {

        // console.log(Object.keys(user.__proto__));

        if (!systemUser) {

          const message = 'Redirect to Signup page!';

          return message;
        }

        systemUser.addInstitution(invitation.institutionId, { through: { access: invitation.access } })
          .then(assignment => {
            return assignment;
          })
          .catch(err => console.log(err));
      })
      .then(respondWithResult(res))
      .catch(err => console.log(err));
  }

}


module.exports = controller