const MedicalHistory = require('./medical-history.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Medication, Allergy, PastIllness, Substance, Surgery } = require('./sub-histories');

const mhView = (data) => {
  const medicalHistory = {
    pastMedicalHistory: {
      allergies: data.pastMedicalHistory.allergies,
      medications: data.pastMedicalHistory.medications,
      surgeries: data.pastMedicalHistory.surgeries,
      pastIllnesses: data.pastMedicalHistory.pastIllness.illness.forEach((item, index) => {
        return {
          illness: item,
          remarks: data.pastMedicalHistory.pastIllness.remarks[index]
        }
      })
    }
  }
  return medicalHistory;
}

const controller = {
  getAll: (req, res) => {
    return MedicalHistory
      .findAll()
      .then(mh => res.send(mh))
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { medicalHistoryId } } = req;
    return MedicalHistory
      .findByPk(medicalHistoryId)
      .then(handleEntityNotFound(res))
      .then(history => {
        console.log(Object.keys(history.__proto__));
        res.send(history);
      })
      .catch(handleError(res));
  },
  getPatientMedicalHistory: (req, res) => {
    const { params: { patientId } } = req;
    return MedicalHistory
      .findOne({ where: { patientId: patientId } })
      .then(handleEntityNotFound(res, 'Medical History'))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  addSurgery: (req, res) => {
    return Surgery
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateSurgery: (req, res) => {
    const { params: { id } } = req;
    return Surgery
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Surgery Updated'))
      .catch(handleError(res));
  },
  deleteSurgery: (req, res) => {
    const { params: { id } } = req;
    return Surgery
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addMedication: (req, res) => {
    return Medication
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateMedication: (req, res) => {
    const { params: { id } } = req;
    return Medication
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Medication updated'))
      .catch(handleError(res));
  },
  deleteMedication: (req, res) => {
    const { params: { id } } = req;
    return Medication
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addAllergy: (req, res) => {
    return Allergy
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateAllergy: (req, res) => {
    const { params: { id } } = req;
    return Allergy
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Allergy Updated'))
      .catch(handleError(res));
  },
  deleteAllergy: (req, res) => {
    const { params: { id } } = req;
    return Allergy
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addSubstance: (req, res) => {
    return Substance
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateSubstance:  (req, res) => {
    const { params: { id } } = req;
    return Substance
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Substance updated'))
      .catch(handleError(res));
  },
  deleteSubstance: (req, res) => {
    const { params: { id } } = req;
    return Substance
      .destroy({ where: { id: id } })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateIllnesses: (req, res) => {
    const { params: { parent, parentId } } = req;
    return PastIllness
      .findOrCreate({ where: { parentId: parentId, parent: parent } })
      .then(result => {
        return result[0].update(req.body);
      })
      .then(() => res.status(200).json('Past Illness Updated'))
      .catch(handleError(res));
  },
  updateSph: (req, res) => {
    const { params: { id } } = req;
    return SocialPersonalHistory
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('SPH updated'))
      .catch(handleError(res));
  },
  createObGyneHistory: (req, res) => {
    return ObGyneHistory
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateObGyneHistory: (req, res) => {
    const { params: { id } } = req;
    return ObGyneHistory
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Ob-Gyne History Updated'))
      .catch(handleError(res));
  }

}

module.exports = controller;