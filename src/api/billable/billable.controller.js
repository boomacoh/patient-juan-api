const Billable = require('./billlable.model');
const Package = require('./package.model');
const Discount = require('./discount.model');
const User = require('../user/user/user.model');
const { handleErrorMsg, respondWithResult, handleEntityNotFound, handleError } = require('../../services/handlers');

const controller = {
  getBillables: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.getBillables())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createBillable: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.createBillable(req.body))
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateBillable: (req, res) => {
    const { params: { id } } = req;
    return Billable
      .findByPk(id)
      .then(billable => billable.update(req.body))
      .then(res.status(200).json('Billable Updated'))
      .catch(handleError(res));
  },
  deleteBillable: (req, res) => {
    const { params: { id } } = req;
    return Billable
      .findByPk(id)
      .then(async billable => {
        count = await billable.countPackages({ scope: false });
        if (count > 0) return res.status(500).json(`Unable to delete. Item belongs to ${count} ${count === 1 ? 'Package' : 'Packages'}`);
        return billable.destroy()
          .then(respondWithResult(res, 204))
          .catch(handleError(res));
      })
      .catch(handleError(res));
  },
  getPackages: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.getPackages())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createPackage: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.createPackage({ name: req.body.name, price: req.body.price }))
      .then(package => package.setBillables(req.body.billables))
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updatePackage: (req, res) => {
    const { params: { id } } = req;
    return Package
      .findByPk(id)
      .then(package => {
        package.name = req.body.name;
        package.price = req.body.price;
        package.save();
        return package.setBillables(req.body.billables);
      })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  deletePackage: (req, res) => {
    const { params: { id } } = req;
    return Package
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  getDiscounts: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.getDiscounts())
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createDiscount: (req, res) => {
    const { payload: { userId } } = req;
    return User
      .findByPk(userId)
      .then(user => user.createDiscount(req.body))
      .then(respondWithResult(res, 201))
      .catch(handleError(res));
  },
  updateDiscount: (req, res) => {
    const { params: { id } } = req;
    return Discount
      .findByPk(id)
      .then(discount => discount.update(req.body))
      .then(res.status(200).json('Discount Updated'))
      .catch(handleError(res));
  },
  deleteDiscount: (req, res) => {
    const { params: { id } } = req;
    return Discount
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  }

}

module.exports = controller;