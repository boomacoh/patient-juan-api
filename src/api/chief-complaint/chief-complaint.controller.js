const ChiefComplaint = require('./chief-complaint.model');
const { respondWithResult, handleError, handleErrorMsg, handleEntityNotFound } = require('../../services/handlers');

const controller = {
    getAll: async (req, res) => {
        return await ChiefComplaint.findAll()
            .then(complaints => {
                res.send(complaints);
            })
            .catch(err => res.send(err));
    },
    getOne: async (req, res) => {
        const { params: { chiefComplaintId } } = req;
        return await ChiefComplaint.findOne({ where: { chiefComplaintId: chiefComplaintId } })
            .then(handleEntityNotFound(res, 'Complaint'))
            .then(complaint => {
                console.log(Object.keys(complaint.__proto__));
                res.status(200).send(complaint)
            })
            .catch(handleError(res));
    },
    create: async (req, res) => {
        return await ChiefComplaint.create(req.body)
            .then(complaint => res.status(201).send(complaint))
            .catch(handleError(res));
    },
    update: async (req, res) => {
        const { params: { chiefComplaintId } } = req;
        return await ChiefComplaint.update(req.body, { where: { chiefComplaintId: chiefComplaintId } })
            .then(() => res.send('Updated'))
            .catch(handleError(res));
    },
    destroy: async (req, res) => {
        const { params: { chiefComplaintId } } = req;
        return await ChiefComplaint.delete({ where: { chiefComplaintId: chiefComplaintId } })
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
}

module.exports = controller;