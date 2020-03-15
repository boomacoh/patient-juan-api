const User = require('../../models/user.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
  register: async (req, res) => {
    const { body: { email, password, access } } = req;

    if (!email) return handleErrorMsg(res, 422, 'Email must not be empty!');
    if (!password) return handleErrorMsg(res, 422, 'Password must not be empty!');
    if (!access) return handleErrorMsg(res, 422, 'Access must not be empty!');

    await User.create({
      email: email,
      password: password,
      access: access
    })
      .then(handleEntityNotFound(res))
      .then(user => {
        user.setPassword(password);
        const mailer = new NodeMailer(user.email);
        const message = {
          email: user.email,
          link: `this-link`
        }
        mailer
          .setTemplate('verify-email', message)
          .setSubject('Verify Email Address')
          .sendHtml();
        return user;
      })
      .then(respondWithResult(res, 201))
      .catch(handleError(res))
  },
  verifyEmail: async (req, res) => {

  },
  login: async (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email) return handleErrorMsg(res, 422, 'Email is required!');
    if (!password) return handleErrorMsg(res, 422, 'Password is required!');

    return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
      if (err) return next(info);
      if (passportUser) {
        const user = passportUser;
        // console.log(Object.keys(user.__proto__));
        user.token = passportUser.createTokenSignature();
        return res.status(200).send(user.generateToken());
      }
      return res.status(401).send(info);
    })(req, res, next);

  }
}

module.exports = controller;