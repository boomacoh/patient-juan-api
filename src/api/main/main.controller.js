const config = require('../../config');

const controller = {
  home: (req, res) => {
    res.render('home', { title: 'Welcome to Patient Juan' });
  },
  toClient: (req, res, next) => {
    const { params: { email } } = req;
    return res.status(301).redirect(`${config.clientUrl}/auth/login?email=${email}`);
    // return next()
  },
  requestResetPassword: (req, res) => {
    const { query: { email } } = req;

    return res.render('reset-password', { data: { email: email } });
  }
}

module.exports = controller;