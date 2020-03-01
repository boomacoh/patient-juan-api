const Test = require('../../models/test.model');

const controller = {
  getAll: (req, res) => {
    
    Test.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.send(err);
      });
  },
  create: (req, res) => {
    console.log(req.body);
    Test.create(req.body)
      .then(data => res.send(data))
      .catch(err => res.json(err));
  }
}


module.exports = controller;