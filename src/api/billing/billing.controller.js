const Billing = require('./billing.model');
const BillingItems = require('./billing-items.model');
const { handleEntityNotFound, respondWithResult, handleErrorMsg, handleError } = require('../../services/handlers');

const controller = {
  getAll: (req, res) => {
    const { query: { institutionId, physicianId } } = req;
    const scopes = [];
    if (institutionId) scopes.push({ method: ['institution', institutionId] });

    return Billing
      .scope(scopes)
      .findAll()
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Billing
      .findByPk(id)
      .then(handleEntityNotFound(res, 'Billing'))
      .then(billing => {
        console.log(Object.keys(billing.__proto__));
        res.send(billing);
      })
      .catch(handleError(res));
  },
  create: (req, res) => {
    return Billing
      .create(req.body)
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  getBillingItems: (req, res) => {
    const { params: { id } } = req;
    return Billing
      .findByPk(id)
      .then(billing => billing.getBillingItems())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createBillingItem: (req, res) => {
    return BillingItems
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateBillingItem: (req, res) => {
    const { params: { id } } = req;
    return BillingItems
      .findByPk(id)
      .then(billingItem => billingItem.update(req.body))
      .then(() => res.status(200).json('Billing Item Updated'))
      .catch(handleError(res));
  },
  deleteBillingItem: (req, res) => {
    const { params: { id } } = req;
    return BillingItems
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  }
}

module.exports = controller;