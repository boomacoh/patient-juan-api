const UserInstitution = require('../user-institution/user-institution.model');
const { handleEntityNotFound, handleErrorMsg, handleError, respondWithResult } = require('../../services/handlers');

const controller = {
  getEntry: async (req, res) => {
    await UserInstitution.findOne({ where: { userId: 1, institutionId: 1 } })
      .then(assignment => {
        console.log(Object.keys(assignment.__proto__));
        return res.send(assignment);
      })
      .catch(handleError(res));
  }
}

module.exports = controller;