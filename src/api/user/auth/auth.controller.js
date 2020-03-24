const User = require('../user/user.model');
const Institution = require('../../institution/institution.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../../utility/mailer');
const config = require('../../../config');
const decode = require('jwt-decode');

const controller = {
  register: async (req, res) => {
    const { body: { email, password, confirmPassword, registeredName } } = req;

    if (!email) return handleErrorMsg(res, 422, 'Email must not be empty!');
    if (!password) return handleErrorMsg(res, 422, 'Password must not be empty!');
    if (!confirmPassword) return handleErrorMsg(res, 422, 'Confirm Password must not be empty!');
    if (password !== confirmPassword) return handleErrorMsg(res, 422, 'Passwords do not match!');
    if (!registeredName) return handleErrorMsg(res, 422, 'Please provide a name for your clinic!');

    const newUser = await User.build({
      email: email,
      password: password,
    });

    await newUser.setPassword(password);
    const token = await newUser.createVerifyToken();
    newUser.verifyToken = token;

    await newUser.save()
      .then(async (user) => {

        console.log(Object.keys(user.__proto__));

        let inst = await Institution.findOrCreate({ where: { registeredName: registeredName } });
        await user.addInstitution(inst[0], { through: { access: ['system'] } });

        const signupToken = user.generateToken();
        const mailer = new NodeMailer(user.email);
        const message = {
          username: user.email.split('@')[0],
          link: `${config.apiUrl}/auth/verify/${user.email}`
          // link: `${config.apiUrl}/auth/verify/${signupToken.token}`
        }

        mailer
          .setTemplate('verify-email', message)
          .setSubject('Verify Email Address')
          .sendHtml();

        return user;
      })
      .then(respondWithResult(res, 201))
      // .catch(handleError(res));
      .catch(err => console.log(err));
  },
  join: async (req, res) => {
    const { body: { email, password, access, institutionId, confirmPassword } } = req;

    if (password !== confirmPassword) return res.render('member-signup', { data: req.body, message: 'Passwords do not match!', class: 'danger' });

    const member = await User.build({
      email: email,
      password: password,
      verified: true
    });

    await member.setPassword(password);
    await member.save()
      .then(user => {

        user.addInstitution(institutionId, { through: { access: access } })
          .then(assignment => {
            setTimeout(() => {
              return res.redirect(`${config.clientUrl}/login/${user.email}`);
            }, 3000);
          })
          .catch(err => console.log(err));
      })
      .then(respondWithResult(res))
      .catch(err => console.log(err));
  },
  verify: async (req, res) => {
    const { params: { email } } = req;

    await User.findOne({ where: { email: email } })
      .then(handleEntityNotFound(res))
      .then(user => {
        const decodedToken = decode(user.verifyToken);
        const today = parseInt(new Date().getTime() / 1000, 10);

        if (decodedToken.exp < today) {
          return res.render('message', { message: 'The token seems to be invalid or expired!' });
        }

        if (user.verified == false) {
          user.verified = true;
          user.save();
          return res.render('message', { message: 'Account successfully verified!', class: "success", email: user.email });
        }
        return res.render('message', { message: 'Account is already verified!', class: 'danger' });

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