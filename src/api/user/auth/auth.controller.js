const User = require('../user/user.model');
const Institution = require('../../institution/institution.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../../utility/mailer');
const config = require('../../../config');
const decode = require('jwt-decode');

const controller = {
  register: async (req, res) => {
    const { body: { email, password, confirmPassword, registeredName, access } } = req;

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

        // console.log(Object.keys(user.__proto__));

        let inst = await Institution.findOrCreate({ where: { registeredName: registeredName } });
        await user.addInstitution(inst[0], { through: { access: access, isDefault: true } });

        const signupToken = user.generateToken();
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
              return res.redirect(`${config.clientUrl}/login?email=${user.email}`);
            }, 3000);
          })
          .catch(err => console.log(err));
      })
      .then(respondWithResult(res))
      .catch(handlErro(res));
  },
    verify: async (req, res) => {
      const { params: { email } } = req;

      await User.findOne({ where: { email: email } })
        .then(handleEntityNotFound(res))
        .then(user => {
          const decodedToken = decode(user.verifyToken);
          const today = parseInt(new Date().getTime() / 1000, 10);

          if (!decodedToken || decodedToken.exp < today) {
            return res.render('message', { message: 'The token seems to be invalid or expired!', class: 'danger' });
          }

          if (user.verified == false) {
            user.verified = true;
            user.save();
            return res.render('message', { message: 'Account successfully verified!', class: "success", email: user.email });
          }
          return res.render('message', { message: 'Account is already verified!', class: 'danger', email: user.email });
        })
        .catch(handleError(res));
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
            return res.status(200).send(user.generateToken(user.institutions[0].user_institution.access));
            return res.status(200).send(user);
            // return next();
          }
          return res.status(401).send(info);
        })(req, res, next);
      }
}

module.exports = controller;