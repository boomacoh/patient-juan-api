const { MedicalHistory } = require('./medical-history.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Allergies, Illnesses, Medication, SubSocialPersonalHistory, Surgeries } = require('./sub-histories');

const controller = {
  getAll: async (req, res) => {
    return await MedicalHistory
      .findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

module.exports = controller;