const User = require('../../models/user.model');
const Institution = require('../../models/institution.model');
const { respondWithResult, handleEntityNotFound, handleError, handleErrorMsg } = require('../../services/handlers');


const controller = {
    getEntries: async (req, res) => {

        return await User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] }, include: [{ model: Institution, through: { attributes: ['createdAt']} }] })
            .then(handleEntityNotFound(res))
            .then((users) => {
                console.table(Object.keys(users.__proto__));
                return res.status(200).send(users)
            })
            .catch(err => console.log(err));
    },
    getEntry: async (req, res) => {
        const { params: { userId } } = req;
        return await User.findByPk(userId, { attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] } })
            .then(handleEntityNotFound(res))
            .then(user => {
                console.log(Object.keys(user.__proto__));
                return res.status(200).send(user)
            })
            .catch(err => console.log(err));
    },
    update: async (req, res) => {
        const { params: { userId } } = req;
        const user = req.body;
    }
}

module.exports = controller;