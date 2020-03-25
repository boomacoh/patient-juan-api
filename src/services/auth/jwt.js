const jwt = require('express-jwt');
const jwtpermissions = require('express-jwt-permissions');
const config = require('../../config');

const guard = jwtpermissions({
  requestProperty: 'payload',
  permissionsProperty: 'access'
});

const tokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if (authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
}

const jwtAuth = {
  required: jwt({
    secret: config.jwtSecret,
    userProperty: 'payload',
    getToken: tokenFromHeaders,
  }),
  optional: jwt({
    secret: config.jwtSecret,
    userProperty: 'payload',
    getToken: tokenFromHeaders,
    credentialsRequired: false
  })
};

const checkPermission = function (permission) {
  return guard.check(permission);
}

module.exports = { jwtAuth, checkPermission };