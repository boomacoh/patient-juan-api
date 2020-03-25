const Institution = require('../institution/institution.model');
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
  getEntry: async (req, res) => {
    const { params: { institutionId } } = req;
    await Institution.findOne({ where: { institutionId: institutionId }, attributes: ['registeredName'], include: [{ model: User }] })
      .then(handleEntityNotFound(res))
      .then(institution => res.send(institution))
      .catch(handleError(res));
  },
  create: async (req, res) => {
    const institution = await Institution.build(req.body);

    return await institution.save()
      .then(handleEntityNotFound(res))
      .then(institution => res.status(200).send(institution))
      .then(respondWithResult(res))
      .catch(handleError(res));
  },
  addUser: async (req, res, next) => {
    try {
      const institution = await Institution.findByPk(1);
      const user = await User.findByPk(1);
      await institution.addUser(user)
        .then(result => { return res.send(result) })
        .catch(err => console.log(err));
    } catch (error) {
      next(error)
    }
  }
}


module.exports = controller;