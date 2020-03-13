module.exports = (app) => {
  app.use('/patient-juan', require('./routes/main'));
  app.use('/patient-juan/test', require('./routes/test'));
  app.use('/patient-juan/patients', require('./routes/patient'));
  app.use('/patient-juan/patients/complaints', require('./routes/chief-complaint'));
  app.use('/patient-juan/users', require('./routes/user'));
  app.use('/patient-juan/invitations', require('./routes/invitation'));
  app.use('/patient-juan/institutions', require('./routes/institution'));
}