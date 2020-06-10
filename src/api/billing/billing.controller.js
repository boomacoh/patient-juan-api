const Billing = require('./billing.model');
const BillingItem = require('./billing-items.model');
const { handleEntityNotFound, respondWithResult, handleErrorMsg, handleError } = require('../../services/handlers');

const controller = {
  getAll: (req, res) => {
    const { query: { institutionId, physicianId, status } } = req;
    const scopes = [];
    if (institutionId) scopes.push({ method: ['institution', institutionId] });
    if (status) scopes.push({ method: ['status', status] });
    if (physicianId) scopes.push({ method: ['physician', physicianId] });

    return Billing
      .scope(scopes, 'details', 'billingItems')
      .findAll({ order: [['createdAt', 'DESC']] })
      .then(respondWithResult(res))
      // .catch(handleError(res));
      .catch(err => res.status(500).send(err));
  },
  getOne: (req, res) => {
    const { params: { id } } = req;
    return Billing
      .scope('details')
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
    return BillingItem
      .create(req.body)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateBillingItem: (req, res) => {
    const { params: { id } } = req;
    return BillingItem
      .findByPk(id)
      .then(billingItem => billingItem.update(req.body))
      .then(() => res.status(200).json('Billing Item Updated'))
      .catch(handleError(res));
  },
  deleteBillingItem: (req, res) => {
    const { params: { id } } = req;
    return BillingItem
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  }
}

module.exports = controller;