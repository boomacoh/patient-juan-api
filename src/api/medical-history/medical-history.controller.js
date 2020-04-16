const MedicalHistory = require('./medical-history.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Medication, Allergy, Illness, Substance, Surgery } = require('./sub-histories');

const controller = {
  getAll: async (req, res) => {
    return await MedicalHistory
      .findAll()
      .then(mh => res.send(mh))
      .catch(handleError(res));
  },
  getOne: async (req, res) => {
    const { params: { medicalHistoryId } } = req;
    return await MedicalHistory
      .findByPk(medicalHistoryId)
      .then(handleEntityNotFound(res))
      .then(history => {
        console.log(Object.keys(history.__proto__));
        res.send(history);
      })
      .catch(handleError(res));
  },
  pmh: async (req, res) => {
    return await PastMedicalHistory
      .findOrCreate({ where: { medicalHistoryId: 1 } })
      .then(pmh => {
        console.log(Object.keys(pmh.__proto__));
        res.send(pmh[0]);
      })
      .catch(handleError(res));
  }
}

module.exports = controller;