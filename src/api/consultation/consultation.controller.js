const Consultation = require('./consultation.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');


const view = (data) => {
  const consultation = {
    consultationId: data.consultationId,
    chiefComplaint: data.chiefComplaint
  }
  return consultation;
}
const controller = {
  getAll: async (req, res) => {
    return await Consultation
      .findAll()
      .then(consultations => res.send(consultations))
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
    return await Consultation
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createHpis: async (req, res) => {
    const hpis = [
      { timeFrame: 'timeFrame1', details: 'details1' },
      { timeFrame: 'timeFrame2', details: 'details2' },
      { timeFrame: 'timeFrame3', details: 'details3' }
    ];

    return await Consultation
      .findOne({ where: { consultationId: 1 } })
      .then(consultation => {
        hpis.forEach(hpi => {
          consultation.createHpi(hpi);
        })
        return consultation;
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

module.exports = controller;