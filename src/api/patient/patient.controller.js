const Patient = require('./patient.model');
const Test = require('../test/test.model');
const { handleErrorMsg, handleEntityNotFound, handleError, respondWithResult } = require('../../services/handlers');

const controller = {
    getAll: async (req, res) => {
        await Patient.findAll()
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
            .then(patient => { return res.status(201).send(patient) })
            .catch(err => console.log(err));
    },
    update: async (req, res) => {
        console.log(req.body);
        const { params: { patientId } } = req;
        return await Patient.update(req.body, { where: { patientId: patientId } })
            .then(affectedRows => {
                return Patient.findOne({ where: { patientId: patientId } })
                    .then(patient => { return res.status(200).send(patient) })
                    .catch(handleError(res));
            })
            .catch(handleError(res));
    },
    destroy: async (req, res) => {

    },
    getTests: async (req, res) => {
        await Patient.getTests()
            .then(data => res.send(data))
            .catch(err => res.send(err));
    }
}

module.exports = controller;