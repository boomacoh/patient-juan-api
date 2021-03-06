const Institution = require('./institution.model');
const User = require('../user/user/user.model');

const { handleEntityNotFound, handleError, respondWithResult, handleErrorMsg } = require('../../services/handlers');

const controller = {
  getEntries: (req, res) => {
    return Institution
      .findAll()
      .then(institutions => {
        return res.status(200).send(institutions);
      })
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Institution
      .findByPk(id)
      .then(handleEntityNotFound(res))
      .then(institution => {
        console.log(Object.keys(institution.__proto__));
        res.send(institution)
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    return Institution
      .create(req.body)
      .then(institution => res.status(200).send(institution))
      .catch(handleError(res));
  },
  update: (req, res) => {
    const { params: { id } } = req;
    return Institution
      .findByPk(id)
      .then(institution => institution.update(req.body))
      .then(res.status(200).json('Clinic Updated'))
      .catch(handleError(res));
  },
  getInvitations: (req, res) => {
    const { params: { id } } = req;
    return Institution
      .findByPk(id)
      .then(institution => institution.getInvitations())
      .then(respondWithResult(res))
      .catch(handleError(res));
  }

}


module.exports = controller;