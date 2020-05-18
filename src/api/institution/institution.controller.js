const Institution = require('./institution.model');
const User = require('../user/user/user.model');

const { handleEntityNotFound, handleError, respondWithResult, handleErrorMsg } = require('../../services/handlers');

const controller = {
  getEntries: async (req, res) => {
    await Institution.findAll({
      include: [User]
    })
      .then(handleEntityNotFound(res))
      .then(institutions => {
        return res.status(200).send(institutions);
      })
      .catch(handleError(res));
  },
  getOne: async (req, res) => {
    const { params: { institutionId } } = req;
    await Institution
      .findByPk(institutionId)
      .then(handleEntityNotFound(res))
      .then(institution => {
        console.log(Object.keys(institution.__proto__));
        res.send(institution)
      })
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const institution = await Institution.build(req.body);

    return await institution.save()
      .then(handleEntityNotFound(res))
      .then(institution => res.status(200).send(institution))
      .catch(handleError(res));
  }
}


module.exports = controller;