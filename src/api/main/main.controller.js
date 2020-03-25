const controller = {
  home: (req, res) => {
    res.render('home', { title: 'Welcome to Patient Juan' });
  },
  toClient: (req, res, next) => {
    const { params: { email } } = req;
    return res.status(301).redirect(`http://localhost:4200/login?email=${email}`);
    // return next()
  }
}

module.exports = controller;