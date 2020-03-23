const Patient = require('./patient.model');
const Test = require('../test/test.model');

const controller = {
    getAll: async (req, res) => {
        await Patient.findAll({
            include: [Test]
        })
            .then(data => res.send(data))
            .catch(err => res.send(err))
    },
    create: async (req, res) => {
        await Patient.create(req.body)
            .then(patient => {
                console.log(patient);
                Test.create({
                    testBody: 'this is a test body',
                    testTitle: 'this is a test title',
                    patientId: patient.patientId
                })
                    .then(test => {
                        res.send(patient)
                        console.log(test)
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => res.json(err));
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