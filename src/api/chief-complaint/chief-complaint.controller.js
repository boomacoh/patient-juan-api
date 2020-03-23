const ChiefComplaint = require('./chief-complaint.model');

const controller = {
    getAll: (req, res) => {
        ChiefComplaint.findAll()
            .then(complaints => {
                res.send(complaints);
            })
            .catch(err => res.send(err));
    }
}

module.exports = controller;