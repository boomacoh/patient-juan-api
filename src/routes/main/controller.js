const controller = {
  home: (req, res) => {
    res.send({message: 'Welcome to my API'});
  }
}

module.exports = controller;