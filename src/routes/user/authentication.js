const User = require('../../models/user.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');
const decode = require('jwt-decode');

const controller = {
  register: async (req, res) => {
    const { body: { email, password, access, confirmPassword } } = req;

    if (!email) return handleErrorMsg(res, 422, 'Email must not be empty!');
    if (!password) return handleErrorMsg(res, 422, 'Password must not be empty!');
    if (!confirmPassword) return handleErrorMsg(res, 422, 'Confirm Password must not be empty!');
    if (password !== confirmPassword) return handleErrorMsg(res, 422, 'Passwords do not match!');

    newUser = await User.build({
      email: email,
      password: password,
    });

    await newUser.setPassword(password);

    await newUser.save()
      .then(handleEntityNotFound(res))
      .then(user => {
        const signupToken = user.generateToken()

        const mailer = new NodeMailer(user.email);
        const message = {
          email: user.email,
          link: `${config.apiUrl}/users/auth/verify-email/${signupToken.token}`
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
    const { params: { token } } = req;
    const decodedToken = decode(token);

    await User.findByPk(decodedToken.userId)
      .then(handleEntityNotFound(res))
      .then(user => {
        if (user.verified == false) {
          user.verified = true;
          user.save();
          return res.render('success', { message: 'Account successfully verified!' });
        }
        return res.render('error', { message: 'Account is already verified!' });
      
      })
      .catch(err => console.log(err));
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