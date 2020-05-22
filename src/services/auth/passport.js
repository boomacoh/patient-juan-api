const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../../api/user/user/user.model');
const Institution = require('../../api/institution/institution.model');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User
    .findOne({ where: { email: email }, include: [{ model: Institution, through: { where: { isDefault: true } } }] })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, { message: 'User not found', status: 404 });
      }
      if (!user.verified) {
        return done(null, false, { message: 'Account not verified. Please check your email to complete the sign up process', status: 401 });
      }
      return done(null, user);
    })
    .catch(err => {
      console.log(err);
      done
    });
}));