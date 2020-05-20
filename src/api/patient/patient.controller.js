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
    getOne: (req, res) => {
        const { params: { id } } = req;
        return Patient
            .findByPk(id)
            .then(handleEntityNotFound(res, 'Patient'))
            .then(respondWithResult(res))
            .catch(handleError(res));
    },
    create: (req, res) => {
        Patient
            .create(req.body)
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
    update: (req, res) => {
        const { params: { id } } = req;
        return Patient
            .update(req.body, { where: { id: id } })
            .then(() => { return Patient.findByPk(id) })
            .then(respondWithResult(res))
            .catch(handleError(res));
    },
    destroy: (req, res) => {
        const { params: { patientId } } = req;
        return Patient
            .destroy({ where: { patientId: patientId } })
            .then(respondWithResult(res, 204))
            .catch(handleError(res));
    }
}

module.exports = controller;