const Test = require('../../models/test.model');
const Patient = require('../../models/patient.model');

const controller = {
  getAll: (req, res) => {
    Test.findAll({
      include: [Patient]
    })
      .then(data => res.send(data))
      .catch(err => res.send(err.toString()));
  },
  create: (req, res) => {
    console.log(req.body);
    Test.create(req.body)
      .then(data => {
        res.send(data);
      })
      .catch(err => res.json(err));
  }
}

Test.belongsTo(Patient, {foreignKey: 'patientId'});

module.exports = controller;