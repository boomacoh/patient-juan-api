const Consultation = require('./consultation.model');
const { handleErrorMsg, handleEntityNotFound, respondWithResult, handleError } = require('../../services/handlers');
const moment = require('moment');

const view = (data) => {
  const consultation = {
    id: data.id,
    queueId: data.queueId,
    chiefComplaint: data.chiefComplaint,
    hpis: data.hpis,
    institution: {
      id: data.institution.id,
      registeredName: data.institution.registeredName,
      mailingAddress: data.institution.mailingAddress
    },
    patient: {
      id: data.patient.id,
      fullName: data.patient.fullName,
      age: moment().diff(data.patient.birthdate, 'years'),
      sex: data.patient.sex,
      mailingAddress: data.patient.mailingAddress,
      contactNo: data.patient.contactNo,
      nationality: data.patient.nationality,
      birthdate: data.patient.birthdate,
    },
    physician: {
      id: data.physician.id,
      // specialization: data.physician.profile.specialization,
      // fullName: data.physician.profile.fullName
    },
    rosystems: data.rosystems,
    physicalExam: data.physicalExam,
    labsAndImagings: data.labsAndImagings,
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
      .then(consultations => {
        console.log(Object.keys(consultations[0].__proto__));
        res.send(consultations);
      })
      .then(respondWithResult(res))
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

        const rosGroup = await consultation.getRosystems({ where: { group: req.body.group } });
        if (!rosGroup[0]) {
          return await consultation.createRosystem(formData);
        }
        return await rosGroup[0].update(formData);
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updatePhysicalExam: (req, res) => {
    console.log(req.body);
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPhysicalExam())
      .then(physicalExam => physicalExam.update(req.body))
      .then(() => res.status(200).json('Physical Exam updated'))
      .catch(handleError(res));
  },
  updateplan: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.update(req.body.planData))
      .then(res.status(200).json('Plan Updated'))
      .catch(handleError(res));
  },
  addLabsAndImaging: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.createLabsAndImaging(req.body))
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateLabsAndImaging: (req, res) => {
    const { params: { id } } = req;
    const { query: { laiId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getLabsAndImagings({ where: { id: laiId } }))
      .then(lai => {
        return lai[0].update(req.body);
      })
      .then(respondWithResult(res))
      .catch(handleError(res))
  },
  deleteLabsAndImaging: (req, res) => {
    const { params: { id } } = req;
    const { query: { laiId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getLabsAndImagings({ where: { id: laiId } }))
      .then(lai => lai[0].destroy())
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addPlanDrug: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.createDrug(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  updatePlanDrug: (req, res) => {
    const { params: { id } } = req;
    const { query: { drugId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.getDrugs({ where: { id: drugId } }))
      .then(drugs => drugs[0].update(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  deletePlanDrug: (req, res) => {
    const { params: { id } } = req;
    const { query: { drugId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.getDrugs({ where: { id: drugId } }))
      .then(drugs => drugs[0].destroy())
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  addPlanTest: (req, res) => {
    const { params: { id } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.createDiagnosticTest(req.body))
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updatePlanTest: (req, res) => {
    const { params: { id } } = req;
    const { query: { testId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.getDiagnosticTests({ where: { id: testId } }))
      .then(tests => tests[0].update(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  deletePlanTest: (req, res) => {
    const { params: { id } } = req;
    const { query: { testId } } = req;
    return Consultation
      .findByPk(id)
      .then(consultation => consultation.getPlan())
      .then(plan => plan.getDiagnosticTests({ where: { id: testId } }))
      .then(tests => tests[0].destroy())
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  }
}

module.exports = controller;