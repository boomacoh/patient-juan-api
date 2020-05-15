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
  updateSph: (req, res) => {
    const { params: { id } } = req;
    return SocialPersonalHistory
      .update(req.body, { where: { id: id } })
      .then(() => res.status(200).json('SPH updated'))
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
  updateSubstance: (req, res) => {
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
    const { query: { scope, parentId } } = req;
    const formData = req.body;
    let model;
    if (scope === 'pmh') model = PastMedicalHistory;
    if (scope === 'fmh') model = FamilyMedicalHistory;

    return model
      .findByPk(parentId)
      .then(result => {

        formData.forEach(data => {
          if (!data.id) result.createPastIllness(data);
        });

        return result;
      })
      .then(async result => {

        const illnesses = await result.getPastIllnesses();

        illnesses.forEach(illness => {
          let index = formData.findIndex(i => i.id === illness.id);
          if (index !== -1) {
            illness.remarks = formData[index].remarks;
            return illness.save();
          }
          illness.destroy();
        });
      })
      .then(() => res.status(200).json('Illnesses updated'))
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