const decode = require('jwt-decode');

const controller = {
  checkTokenExpiry: (req, res, next) => {
    const { params: { token } } = req;
    const decodedToken = decode(token);
    const today = parseInt(new Date().getTime() / 1000, 10);

    if (decodedToken.exp < today) {
      res.locals.isTokenExpired = true;
      return res.render('message', { message: 'The token seems to be invalid or expired!' });
    }
    
    res.locals.isTokenExpired = false;
    return next();
  }
}

module.exports = controller;