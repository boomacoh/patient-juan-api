const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../../models/user.model');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (email, password, done) => {
  User.findOne({ email: email })
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, 'User not found!');
      }
      // if (user.verified === false) {
      //   return done(null, false, `The email; ${user.email} is not verified! Please check your email to continue the account verification process`);
      // }
      return done(null, user);
    })
    .catch(done);
}));