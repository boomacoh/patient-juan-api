const MedicalHistory = require('./medical-history.model');
const { respondWithResult, handleErrorMsg, handleEntityNotFound, handleError } = require('../../services/handlers');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { MedicalCondition, Medication, ChildHoodDisease, Hospitalization, Surgery, Injury, BloodTransfusion, Allergy, Psychiatric } = require('./sub-histories');

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
    const { params: { id } } = req;
    return MedicalHistory
      .scope('all')
      .findByPk(id)
      .then(handleEntityNotFound(res))
      .then(history => {
        console.log(Object.keys(history.__proto__));
        res.send(history);
      })
      .catch(handleError(res));
  },
  addMedicalCondition: (req, res) => {
    return MedicalCondition
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateMedicalCondition: (req, res) => {
    const { params: { id } } = req;
    return MedicalCondition
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Medical Conditon Updated'))
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
  addChildhoodDisease: (req, res) => {
    return ChildHoodDisease
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateChildhoodDisease: (req, res) => {
    const { params: { id } } = req;
    return ChildHoodDisease
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Childhood Disease Updated'))
      .catch(handleError(res));
  },
  addHospitalization: (req, res) => {
    return Hospitalization
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateHospitalization: (req, res) => {
    const { params: { id } } = req;
    return Hospitalization
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Hospitalization Updated'))
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
  addInjury: (req, res) => {
    return Injury
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateInjury: (req, res) => {
    const { params: { id } } = req;
    return Injury
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Injury Updated'))
      .catch(handleError(res));
  },
  addBloodTransfusion: (req, res) => {
    return BloodTransfusion
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateBloodTransfusion: (req, res) => {
    const { params: { id } } = req;
    return BloodTransfusion
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Blood Transfusion Updated'))
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
  addPsychiatric: (req, res) => {
    return Psychiatric
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updatePsychiatric: (req, res) => {
    const { params: { id } } = req;
    return Psychiatric
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('Psychiatric Updated'))
      .catch(handleError(res));
  },
  updateSph: (req, res) => {
    const { params: { id } } = req;
    return SocialPersonalHistory
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('SPH updated'))
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