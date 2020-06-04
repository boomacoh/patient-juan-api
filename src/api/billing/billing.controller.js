const Billing = require('./billing.model');
const BillingItems = require('./billing-items.model');
const { handleEntityNotFound, respondWithResult, handleErrorMsg, handleError } = require('../../services/handlers');

const controller = {
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Billing
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Billing'))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  addBillingItem: (req, res) => {
    const { params: { id } } = req;
    return Billing
      .findByPk(id)
      .then(billing => billing.addBillingItem(req.body))
      .then(respondWithResult(res))
      .catch(handleError(res));
  }
}

module.exports = controller;