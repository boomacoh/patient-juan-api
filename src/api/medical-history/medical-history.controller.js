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
  getPatientMedicalHistory: async (req, res) => {
    const { params: { patientId } } = req;
    return await MedicalHistory
      .findOne({ where: { patientId: patientId } })
      .then(handleEntityNotFound(res, 'Medical History'))
      .then(respondWithResult(res))
      .catch(err => res.status(500).send(err));
  },
  updatePastMedicalHistory: async (req, res, next) => {
    const { body: { pastMedicalHistory } } = req;
    await PastMedicalHistory
      .findByPk(1)
      .then(pmh => {
        const surgeries = pmh.surgeries;
        const data = {
          approxDate: "2020-04-08",
          type: "surgery type",
          reason: "surgery reasonssssss",
          complications: "surgery complications",
          pastMedicalHistoryId: 1
        }
        console.log(Object.keys(pmh.__proto__));
        // return res.json(surgeries.some(s => s.reason  === data.reason));
        Surgery.destroy({ where: { pastMedicalHistoryId: pmh.id } })

        return pmh.createSurgery(data);

        res.send(surgeries);
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

module.exports = controller;