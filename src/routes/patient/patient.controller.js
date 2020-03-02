const Patient = require('../../models/patient.model');

const controller = {
    getAll: async (req, res) => {
        await Patient.findAll()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    },
    create: async (req, res) => {
        await Patient.create(req.body)
            .then(data => res.send(data))
            .catch(err => res.json(err));
    },
    update: async (req, res) => {

    },
    destroy: async (req, res) => {

    }
}

module.exports = controller;