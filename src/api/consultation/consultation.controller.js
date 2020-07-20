const Consultation = require('./consultation.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');
const sequelize = require('sequelize');
const { Ros } = require('../review-of-systems/review-of-systems.model');
const handlers = require('../../services/handlers');

const view = (data) => {
  const consultation = {
    id: data.id,
    queueId: data.queueId,
    chiefComplaint: data.chiefComplaint,
    hpis: data.hpis,
    institution: {
      id: data.institution.id,
      registeredName: data.institution.registeredName,
      address: data.institution.mailingAddress
    },
    patient: {
      id: data.patient.id,
      fullName: data.patient.fullName,
      age: moment().diff(data.patient.birthdate, 'years'),
      sex: data.patient.sex,
      addresss: data.patient.mailingAddress,
      contactNo: data.patient.contactNo,
      nationality: data.patient.nationality,
      birthdate: data.patient.birthdate,
    },
    physician: {
      id: data.physician.id,
      // specialization: data.physician.profile.specialization,
      // fullName: data.physician.profile.fullName
    },
    ros: data.rosystem,
    physicalExam: data.physicalExam,
    labsAndImaging: data.labsAndImaging,
    diagnosis: data.diagnosis,
    plan: data.plan,
    billing: data.billing,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }

  return consultation;
}
const controller = {
  getAll: (req, res) => {
    return Consultation
      .findAll()
      .then(respondWithResult(res))
      // .then(consultations => res.send(consultations.map(view)))
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .scope('all')
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Consultation'))
      .then(consultation => {
        // return res.send(consultation);
        res.send(view(consultation));
      })
      .catch(handleError(res));
  },
  update: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.update(req.body))
      .then(() => res.status(200).json('Consultation Updated'))
      .catch(err => res.json(err));
  },
  create: (req, res) => {
    return Consultation
      .create(req.body, { hooks: true })
      .then(consultation => {
        // consultation.createPhysicalExam();
        // consultation.createPlan();
        return consultation;
      })
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
              let index = req.body.hpis.findIndex(i => i.id === hpi.id);
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
  updateRosGroup: (req, res) => {
    const { params: { id } } = req;
    const formData = req.body;
    return Consultation
      .findByPk(id)
      .then(async consultation => {
        console.log(Object.keys(consultation.__proto__));

        const rosGroup = await consultation.getRosystem({ where: { group: req.body.group } });
        if (!rosGroup[0]) {
          return await consultation.createRosystem(formData);
        }
        return await rosGroup[0].update(formData);
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updatePhysicalExam: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPhysicalExam())
      .then(physicalExam => physicalExam.update(req.body))
      .then(() => res.status(200).json('Physical Exam updated'))
      .catch(handleError(res));
  },
  updateLabsAndImaging: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(async consultation => {

        req.body.labsAndImaging.forEach(d => {
          if (!d.id) consultation.createLabsAndImaging(d);
        });

        const current = await consultation.getLabsAndImaging();

        current.forEach(b => {
          let index = req.body.labsAndImaging.findIndex(i => i.id === b.id);
          if (index !== -1) return b.update({ date: req.body.labsAndImaging[index].date, test: req.body.labsAndImaging[index].test, remrarks: req.body.labsAndImaging[index].remarks });
          b.destroy();
        });

        return consultation;
      })
      .then(respondWithResult(res))
      .catch(handleError(res))
  },
  updateplan: async (req, res) => {
    const { params: { id } } = req;
    const planData = req.body;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => {

        plan.diet = planData.diet;
        plan.disposition = planData.disposition;
        plan.specificInstructions = planData.specificInstructions;
        plan.followUpDate = planData.followUpDate;
        plan.followUpTime = planData.followUpTime;
        plan.followUpInstructions = planData.followUpInstructions;

        if (planData.drugs.length > 0) {
          planData.drugs.forEach(drug => {
            if (!drug.id) plan.createDrug(drug);
          });
        }
        if (planData.diagnosticTests.length > 0) {
          planData.diagnosticTests.forEach(dt => {
            if (!dt.id) plan.createDiagnosticTest(dt);
          });
        }

        plan.save();
        return plan;
      })
      .then(async plan => {
        const drugs = await plan.getDrugs();

        drugs.forEach(drug => {
          let index = planData.drugs.findIndex(i => i.id === drug.id);
          if (index !== -1) {
            return drug.update({
              generic: planData.drugs[index].generic,
              qty: planData.drugs[index].qty,
              brand: planData.drugs[index].brand,
              preparation: planData.drugs[index].preparation,
              instructions: planData.drugs[index].instructions,
            });
          }
          drug.destroy();
        });
        return plan;
      })
      .then(async plan => {
        const diagnosticTests = await plan.getDiagnosticTests();
        diagnosticTests.forEach(dTest => {
          let dtIndex = planData.diagnosticTests.findIndex(j => j.id === dTest.id);
          if (dtIndex !== -1) {
            return dTest.update({
              test: planData.diagnosticTests[dtIndex].test,
              instructions: planData.diagnosticTests[dtIndex].instructions
            });
          }
          dTest.destroy();
        });

        return plan;
      })
      .then(() => res.status(200).json('Plan Updated'))
      .catch(handleError(res));
  },
}

module.exports = controller;