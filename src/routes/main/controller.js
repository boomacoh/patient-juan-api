const controller = {
  home: (req, res) => {
    res.render('home', { title: 'Welcome to Patient Juan' });
  }
}

module.exports = controller;