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
        return done(null, false, 'User not found!');
      }
      if (user.verified === false) {
        return done(null, false, `Account not verified!`);
      }
      return done(null, user);
    })
    .catch(done);
}));