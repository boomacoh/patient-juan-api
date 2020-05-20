const Consultation = require('./consultation.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');

const view = (data) => {
  const consultation = {
    id: data.id,
    queueId: data.queueId,
    chiefComplaint: data.chiefComplaint,
    hpis: data.hpis,
    patient: {
      id: data.patient.id,
      fullName: data.patient.fullName,
      sex: data.patient.sex,
      birthdate: data.patient.birthdate,
      age: moment().diff(data.patient.birthdate, 'years')
    },
    physician: {
      id: data.physician.userId,
      specialization: data.physician.profile.specialization,
      fullName: data.physician.profile.fullName
    },
    reviewOfSystems: {
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
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        // console.log(Object.keys(consultation.__proto__));
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
  update: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => {
        return consultation.update(req.body);
      })
      .then(() => res.status(200).json('Consultation Updated'))
      .catch(err => res.json(err));
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
        consultation.createPlan();
        return consultation;
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getAssociation: (req, res) => {
    const { params: { id, association } } = req;
    return Consultation
      .findByPk(id, { attributes: [], include: association })
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updateHpis: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
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
    const { params: { id } } = req;
    const rosData = req.body;
    console.log(req.body);
    return Consultation
      .findByPk(id)
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
    const { params: { group, id } } = req;
    return Consultation
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        return consultation[group]
          .update(req.body)
      })
      .then(() => res.status(200).json(`${group} updated`))
      .catch(handleError(res));
  },
  updatePhysicalExam: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => {
        return consultation.getPhysicalExam();
      })
      .then(physicalExam => {
        return physicalExam.update(req.body)
      })
      .then(() => res.status(200).json('Physical Exam updated'))
      .catch(handleError(res));
  },
  updateplan: (req, res) => {
    const { params: { id } } = req;
    const planData = req.body;
    return Consultation
      .findByPk(id)
      .then(consultation => {
        return consultation.getPlan();
      })
      .then(plan => {
        plan.diet = planData.diet;
        plan.disposition = planData.disposition;

        if (planData.drugs.length > 0) {
          planData.drugs.forEach(drug => {
            if (!drug.id) plan.createDrug(drug);
          });
        }
        if (planData.diagnostics.length > 0) {
          planData.diagnostics.forEach(diagnostic => {
            if (!diagnostic.id) plan.createDiagnostic(diagnostic);
          });
        }

        plan.save();
        return plan;

      })
      .then(async plan => {
        const drugs = await plan.getDrugs();
        const diagnostics = await plan.getDiagnostics();

        drugs.forEach(drug => {
          let index = planData.drugs.findIndex(i => i.id === drug.id);
          if (index !== -1) {
            return drug.update({
              generic: planData.drugs[index].generic,
              brand: planData.drugs[index].brand,
              preparation: planData.drugs[index].preparation,
              frequency: planData.drugs[index].frequency,
              route: planData.drugs[index].route,
              purpose: planData.drugs[index].purpose
            });
          }
          drug.destroy();
        });

        diagnostics.forEach(diagnostic => {
          let index = planData.diagnostics.findIndex(j => j.id === diagnostic.id);
          if (index !== -1) {
            return diagnostic.update({
              diagnostic: planData.diagnostics[index].diagnostic,
              details: planData.diagnostics[index].details
            });
          }
          diagnostic.destroy();
        });

        return plan;
      })
      .then(() => res.status(200).json('Plan Updated'))
      .catch(handleError(res));
  }
}

module.exports = controller;