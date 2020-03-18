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
        next(res.send('User is already a member of this clinic'));
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
        next(res.send('User already has a pending invitation from this clinic!'));
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
          return res.render('message', { message: 'This Invitation has expired or invalid!', class: 'danger' });
        }
        invitation.status = 'approved';
        invitation.save();
        return next()
      })
      .catch(err => console.log(err));
  },
  assign: async (req, res, next) => {
    const invitation = res.locals.invitation;
    console.log(typeof invitation.institutionId);
    await User.findOne({ where: { email: invitation.email } })
      .then(async (systemUser) => {

        // console.log(Object.keys(user.__proto__));

        if (!systemUser) {

          //redirect to member signup
          return res.render('member-signup', { data: { email: invitation.email, access: invitation.access, institutionId: invitation.institutionId } });
        }

        const assignment = await systemUser.addInstitution(invitation.institutionId, { through: { access: invitation.access } });
        return assignment;
      })
      .then(respondWithResult(res))
      .catch(err => console.log(err));
  }

}


module.exports = controller