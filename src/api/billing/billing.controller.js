const Billing = require('./billing.model');
const BillingItem = require('./billing-items.model');
const { handleEntityNotFound, respondWithResult, handleErrorMsg, handleError } = require('../../services/handlers');

const billingItemView = (data) => {
  const billingItem = {
    id: data.id,
    name: data.name,
    price: data.price,
    tag: data.tag,
    qty: data.qty,
    discount: data.discount,
    discountType: data.discountType,
    discountValue: data.discountValue,
    hmo: data.hmo,
    hmoValue: data.hmoValue,
    items: data.items,
    total: data.total < 0 ? 0 : data.total,
    billingId: data.billingId
  }
  return billingItem;
}

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
      .then(billingItems => res.send(billingItems.map(item => billingItemView(item))))
      .catch(handleError(res));
  },
  createBillingItem: (req, res) => {
    const formData = req.body;
    if (formData.discountType === 'amt' && formData.discountValue > (formData.price * formData.qty)) {
      return handleErrorMsg(res, 400, 'Discount value cannot exceed price');
    }
    if ((formData.price) === 0 && formData.discountType === 'percent') {
      formData.discount = 'N/A';
      formData.discountType = null;
      formData.discountValue = 0;
    }
    console.log(formData);
    return BillingItem
      .create(formData)
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateBillingItem: (req, res) => {
    const { params: { id } } = req;
    const formData = req.body;
    if (formData.discountType === 'amt' && formData.discountValue > (formData.price * formData.qty)) {
      return handleErrorMsg(res, 400, 'Discount value cannot exceed price');
    }
    if ((formData.price) === 0 && formData.discountType === 'percent') {
      formData.discount = 'N/A';
      formData.discountType = null;
      formData.discountValue = 0;
    }
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