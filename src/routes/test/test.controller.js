const { handleEntityNotFound, handleError, respondWithResult } = require('../../services/handlers');

const User = require('../../models/user.model');
const Test = require('../../models/test.model');
const Patient = require('../../models/patient.model');
const Institution = require('../../models//institution.model');
const Specialization = require('../../models/specialization.model');
const UserInstitution = require('../../models/user-institution.model');



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
  },
  createInst: async (req, res) => {
    const newInst = await Institution.build(req.body)
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

// Test.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = controller;