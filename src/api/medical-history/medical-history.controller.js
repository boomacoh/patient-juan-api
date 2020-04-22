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
  addSurgery: async (req, res) => {
    return await Surgery
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateSurgery: async (req, res) => {
    const { params: { id } } = req;
    return await Surgery
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Surgery Updated'))
      .catch(handleError(res));
  },
  deleteSurgery: async (req, res) => {
    const { params: { id } } = req;
    return await Surgery
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addMedication: async (req, res) => {
    return await Medication
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateMedication: async (req, res) => {
    const { params: { id } } = req;
    return await Medication
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Medication updated'))
      .catch(handleError(res));
  },
  deleteMedication: async (req, res) => {
    const { params: { id } } = req;
    return await Medication
      .destory({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addAllergy: async (req, res) => {
    return await Allergy
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateAllergy: async (req, res) => {
    const { params: { id } } = req;
    return await Allergy
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Allergy Updated'))
      .catch(handleError(res));
  },
  deleteAllergy: async (req, res) => {
    const { params: { id } } = req;
    return await Allergy
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addSubstance: async (req, res) => {
    return await Substance
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateSubstance: async (req, res) => {
    const { params: { id } } = req;
    return await Substance
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Substance updated'))
      .catch(handleError(res));
  },
  deleteSubstance: async (req, res) => {
    const { params: { id } } = req;
    return await Substance
      .destroy({ where: { id: id } })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }

}

module.exports = controller;