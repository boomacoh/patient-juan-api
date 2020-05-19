const Patient = require('./patient.model');
const { handleErrorMsg, handleEntityNotFound, handleError, respondWithResult } = require('../../services/handlers');

const controller = {
    getAll: async (req, res) => {
        const { query: { institutionId } } = req;
        const scopes = [];
        if (institutionId) scopes.push({ method: ['institution', institutionId] });

        await Patient
            .scope(scopes)
            .findAll()
            .then(handleEntityNotFound(res))
            .then(patients => res.status(200).send(patients))
            .catch(handleError(res));
    },
    getOne: async (req, res) => {
        const { params: { patientId } } = req;
        return await Patient.findOne({ where: { patientId: patientId } })
            .then(patient => res.send(patient))
            .catch(handleError(res));
    },
    create: async (req, res) => {
        await Patient.create(req.body)
            .then(patient => {
                patient
                    .createMedicalHistory()
                    .then(async mh => {
                        await mh.createPastMedicalHistory();
                        await mh.createFamilyMedicalHistory();
                        await mh.createSocialPersonalHistory();
                    })
                    .catch(handleError(res));
                return patient;
            })
            .then(respondWithResult(res))
            .catch(handleError(res));
    },
    update: async (req, res) => {
        const { params: { patientId } } = req;
        return await Patient
            .update(req.body, { where: { patientId: patientId } })
            .then(() => { return Patient.findByPk(patientId) })
            .then(respondWithResult(res))
            .catch(handleError(res));
    },
    destroy: async (req, res) => {
        const { params: { patientId } } = req;
        return await Patient
            .destroy({ where: { patientId: patientId } })
            .then(respondWithResult(res, 204))
            .catch(handleError(res));
    }
}

module.exports = controller;