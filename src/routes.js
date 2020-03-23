module.exports = (app) => {
  app.use('/', require('./api/main'));
  app.use('/test', require('./api/test'));
  app.use('/patients', require('./api/patient'));
  app.use('/patients/complaints', require('./api/chief-complaint'));
  app.use('/users', require('./api/user/user'))
  app.use('/auth', require('./api/user/auth'));
  app.use('/me', require('./api/user/me'))
  app.use('/invitations', require('./api/invitation'));
  app.use('/institutions', require('./api/institution'));
  app.use('/profiles', require('./api/profile'));
}