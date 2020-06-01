const Billable = require('./billlable.model');
const Package = require('./package.model');
const { handleErrorMsg, respondWithResult, handleEntityNotFound, handleError } = require('../../services/handlers');

const controller = {
  getBillables: (req, res) => {
    const { payload: { userId } } = req;
    return Billable
      .findAll({ where: { userId: userId } })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createBillable: (req, res) => {
    return Billable
      .create(req.body)
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
      .destroy({ where: { id: id } })
      .then(respondWithResult(res, 204))
      .catch(handleError(res));
  },
  getPackages: (req, res) => {
    const { payload: { userId } } = req;
    return Package
      .findAll({ where: { userId: userId } })
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  createPackage: (req, res) => {
    const { payload: { userId } } = req;
    return Package
      .create({ name: req.body.name, price: req.body.price, userId: userId })
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
  }

}

module.exports = controller;