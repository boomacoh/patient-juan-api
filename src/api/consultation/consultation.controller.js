const Consultation = require('./consultation.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const ChiefComplaint = require('../chief-complaint/chief-complaint.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');


const view = (data) => {
  const consultation = {
    consultationId: data.consultationId,
    chiefComplaint: data.chiefComplaint.chiefComplaint,
    hpis: data.hpis,
    patient: {
      patientId: data.patient.patientId,
      fullName: data.patient.fullName,
    },
    physician: {
      userId: data.physician.userId,
      specialization: data.physician.specialization,
      fullName: data.physician.fullName
    }
  }
  return consultation;
}
const controller = {
  getAll: async (req, res) => {
    return await Consultation
      .findAll()
      .then(consultations => res.send(consultations.map(consultation => { return view(consultation) })))
      .catch(handleError(res));
  },
  getOne: async (req, res) => {
    const { params: { consultationId } } = req;
    return await Consultation
      .findOne({ where: { consultationId: consultationId } })
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        console.log(Object.keys(consultation.__proto__));
        consultation.createHpi
        res.send(consultation)
      })
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const { body: { chiefComplaint, queueId, hpis, patientId, physicianId } } = req;
    return await Consultation
      .create({
        queueId: queueId,
        patientId: patientId,
        physicianId: physicianId,
        chiefComplaint: { chiefComplaint: chiefComplaint },
        hpis: hpis
      }, { include: [ChiefComplaint, Hpi, 'physician'] })
      .then(respondWithResult(res))
      .catch(err => {
        console.log(err);
        handleError(res);
      });
  },
}

module.exports = controller;