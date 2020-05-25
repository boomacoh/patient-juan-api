const Patient = require('./patient.model');
const { handleErrorMsg, handleEntityNotFound, handleError, respondWithResult } = require('../../services/handlers');

const controller = {
    getAll: (req, res) => {
        return Patient
            .findAll()
            .then(respondWithResult(res))
            .catch(handleError(res));
    },
    getOne: (req, res) => {
        const { params: { id } } = req;
        return Patient
            .findByPk(id)
            .then(handleEntityNotFound(res, 'Patient'))
            .then(patient => {
                res.send(patient);
                console.log(Object.keys(patient.__proto__));
            })
            .catch(handleError(res));
    },
    create: (req, res) => {
        Patient
            .create(req.body)
            .then(patient => {
                patient
                    .addPhysician(req.body.physicianId);
                patient
                    .createMedicalHistory()
                    .then(mh => {
                        mh.createPastMedicalHistory();
                        mh.createFamilyMedicalHistory();
                        mh.createSocialPersonalHistory();
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
        const { params: { id } } = req;
        return Patient
            .destroy({ where: { id: id } })
            .then(respondWithResult(res, 204))
            .catch(handleError(res));
    },
    getMedicalHistory: (req, res) => {
        const { params: { id } } = req;
        return Patient
            .findByPk(id)
            .then(patient => patient.getMedicalHistory())
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
}

module.exports = controller;