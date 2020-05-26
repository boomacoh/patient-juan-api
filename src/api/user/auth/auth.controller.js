const User = require('../user/user.model');
const Institution = require('../../institution/institution.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../../utility/mailer');
const config = require('../../../config');
const decode = require('jwt-decode');

const controller = {
  register: (req, res) => {
    const { body: { userInfo, clinicInfo, profileInfo } } = req;

    if (!userInfo.email) return handleErrorMsg(res, 422, 'Email must not be empty!');
    if (!userInfo.password) return handleErrorMsg(res, 422, 'Password must not be empty!');
    if (!clinicInfo.registeredName) return handleErrorMsg(res, 422, 'Please provide a name for your clinic!');

    const newUser = User.build({
      email: userInfo.email
    }, { fields: ['email'] });

    newUser.setPassword(userInfo.password);
    const token = newUser.createVerifyToken();
    newUser.verifyToken = token;

    newUser.save()
      .then(user => {

        console.log(Object.keys(user.__proto__));
        user
          .createOwnedInstitution(clinicInfo)
          .then(institution => user.addInstitution(institution, { through: { access: ['sytem', 'clinic:doctor'], isDefault: true } }))
          .catch(handleError(res));

        user
        .createProfile(profileInfo);

        const mailer = new NodeMailer(user.email);
        const message = {
          username: user.email.split('@')[0],
          link: `${config.apiUrl}/auth/verify/${user.email}`
        }

        mailer
          .setTemplate('verify-email', message)
          .setSubject('Welcome!')
          .sendHtml();

        return user;
      })
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  join: (req, res) => {
    const { body: { email, password, access, institutionId, confirmPassword } } = req;

    if (password !== confirmPassword) return res.render('member-signup', { data: req.body, message: 'Passwords do not match!', class: 'danger' });

    const member = User.build({
      email: email,
      verified: true
    });

    member.setPassword(password);
    return member.save()
      .then(user => {

        user.addInstitution(institutionId, { through: { access: access } })
          .then(assignment => {
            setTimeout(() => {
              return res.status(301).redirect(`${config.clientUrl}/login?email=${user.email}`);
            }, 3000);
          })
          .catch(handleError(res));
      })
      .then(respondWithResult(res))
      .catch(handlErro(res));
  },
  verify: (req, res) => {
    const { params: { email } } = req;

    return User
      .findOne({ where: { email: email } })
      .then(handleEntityNotFound(res))
      .then(user => {
        const decodedToken = decode(user.verifyToken);
        const today = parseInt(new Date().getTime() / 1000, 10);

        if (!decodedToken || decodedToken.exp < today) {
          return res.render('message', { data: { message: 'The token seems to be invalid or expired!', class: 'danger' } });
        }

        if (!user.verified) {
          user.verified = true;
          user.save();
          return res.render('message', { data: { message: 'Account successfully verified!', class: "success", email: user.email } });
        }
        return res.render('message', { data: { message: 'Account is already verified!', class: 'danger', email: user.email } });
      })
      .catch(handleError(res));
  },
  resetPassword: (req, res) => {
    const { body: { email, newPassword, confirmNewPassword } } = req;

    if (newPassword !== confirmNewPassword) return res.render('reset-password', { data: { email: email }, message: 'Passwords do not match!', class: 'danger' });

    return User
      .findOne({ where: { email: email } })
      .then(handleEntityNotFound(res, 'User'))
      .then(user => {
        if (!user) return res.render('message', { data: { message: 'We cannot find the user within our database', class: 'danger' } });

        user.setPassword(newPassword);
        user.save()
          .then(() => res.render('message', { data: { message: 'Password Updated!', class: 'success', email: user.email } }))
          .catch(() => res.render('message', { data: { message: 'Something Went wrong! Could not update your password' } }));
      })
      .catch(handleError(res));
  },
  login: (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email) return handleErrorMsg(res, 422, 'Email is required!');
    if (!password) return handleErrorMsg(res, 422, 'Password is required!');

    return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
      if (err) return next(info);
      if (passportUser) {
        const user = passportUser;

        // console.log(Object.keys(user.__proto__));
        // user.token = passportUser.createTokenSignature();

        return res.status(200).send({ userId: user.id, token: user.generateToken() });
      }
      return res.send(info.status, info.message);
    })(req, res, next);
  }
}

module.exports = controller;