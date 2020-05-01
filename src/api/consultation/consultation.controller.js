const Consultation = require('./consultation.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');

const view = (data) => {
  const consultation = {
    consultationId: data.consultationId,
    chiefComplaint: data.chiefComplaint,
    hpis: data.hpis,
    patient: {
      patientId: data.patient.patientId,
      fullName: data.patient.fullName,
    },
    physician: {
      userId: data.physician.userId,
      specialization: data.physician.profile.specialization,
      fullName: data.physician.profile.fullName
    },
    rosys: {
      generalHealth: data.rosGeneralHealth,
      heent: data.rosHeent,
      cardiovascularSystem: data.rosCardiovascularSystem,
      respiratorySystem: data.rosRespiratorySystem,
      gastroIntestinalSystem: data.rosGastroIntestinalSystem,
      nervousSystem: data.rosNervousSystem,
    },
    physicalExam: data.physicalExam,
    diagnosis: data.diagnosis,
    plan: data.plan
  }
  if (!consultation.physicalExam) delete consultation.physicalExam;
  if (!consultation.plan) delete consultation.plan;
  return consultation;
}
const controller = {
  getAll: (req, res) => {
    return Consultation
      .findAll()
      .then(consultations => res.send(consultations.map(consultation => { return view(consultation) })))
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { consultationId } } = req;
    return Consultation
      .findByPk(consultationId)
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        console.log(Object.keys(consultation.__proto__));
        res.send(view(consultation));
      })
      .catch(handleError(res));
  },
  find: (req, res) => {
    const query = req.query || {};
    return Consultation
      .findOne({ where: query })
      .then(consultation => {
        if (!consultation) return res.json(false);
        res.json(true);
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    return Consultation
      .create(req.body)
      .then(consultation => {
        consultation.createRosGeneralHealth();
        consultation.createRosHeent();
        consultation.createRosCardiovascularSystem();
        consultation.createRosRespiratorySystem();
        consultation.createRosNervousSystem();
        consultation.createRosGastroIntestinalSystem();
        consultation.createPhysicalExam();
        return consultation;
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getAssociation: (req, res) => {
    const { params: { consultationId, association } } = req;
    return Consultation
      .findByPk(consultationId, { attributes: [], include: association })
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateHpis: (req, res) => {
    const { params: { consultationId } } = req;
    return Consultation
      .findByPk(consultationId)
      .then(consultation => {

        req.body.hpis.forEach(item => {
          if (!item.id) consultation.createHpi(item);
        });

        consultation.chiefComplaint = req.body.chiefComplaint;
        consultation.save();

        return consultation;
      })
      .then(consultation => {

        consultation.getHpis()
          .then(hpis => {
            hpis.forEach(hpi => {
              let index = req.body.hpis.findIndex(i => { return i.id === hpi.id });
              if (index !== -1) return hpi.update({ timeFrame: req.body.hpis[index].timeFrame, details: req.body.hpis[index].details });
              hpi.destroy();
            });
          })
          .catch(handleError(res));
        return consultation;
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateRosys: (req, res) => {
    const { params: { consultationId } } = req;
    const rosData = req.body;
    console.log(req.body);
    return Consultation
      .findByPk(consultationId)
      .then(consultation => {
        consultation.rosGeneralHealth.update(rosData.rosGeneralHealth);
        consultation.rosHeent.update(rosData.rosHeent);
        consultation.rosCardiovascularSystem.update(rosData.rosCardiovascularSystem);
        consultation.rosRespiratorySystem.update(rosData.rosRespiratorySystem);
        consultation.rosGastroIntestinalSystem.update(rosData.rosGastroIntestinalSystem);
        consultation.rosNervousSystem.update(rosData.rosNervousSystem);
      })
      .then(() => res.status(200).json('Consultation Updated'))
      .catch(handleError(res));
  },
  updateRosysGroup: (req, res) => {
    const { params: { group, consultationId } } = req;
    return Consultation
      .findByPk(consultationId)
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        return consultation[group]
          .update(req.body)
      })
      .then(() => res.status(200).json(`${group} updated`))
      .catch(handleError(res));
  },
  updatePhysicalExam: (req, res) => {
    const { params: { consultationId } } = req;
    return Consultation
      .findByPk(consultationId)
      .then(async consultation => {
        const physicalExam = await consultation.getPhysicalExam();
        await physicalExam.update(req.body.physicalExam);
      })
  }
}

module.exports = controller;