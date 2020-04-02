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
    create: async (req, res) => {
        await Patient.create(req.body)
            .then(patient => { return res.status(201).send(patient) })
            .catch(err => res.send(err));
    },
    update: async (req, res) => {

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