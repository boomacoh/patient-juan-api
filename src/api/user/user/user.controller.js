const User = require('./user.model');
const Institution = require('../../institution/institution.model');
const { respondWithResult, handleEntityNotFound, handleError, handleErrorMsg } = require('../../../services/handlers');
const NodeMailer = require('../../../utility/mailer');
const config = require('../../../config');

const controller = {
    getAll: (req, res) => {
        const { query: { type } } = req;
        const scopes = [];
        if (type) scopes.push({ method: ['type', type] });

        return User
            .scope(scopes)
            .findAll({ attributes: { exclude: ['hash', 'salt', 'verifyToken'] } })
            .then((users) => res.status(200).send(users))
            .catch(handleError(res));
    },
    getOne: (req, res) => {
        const { params: { id } } = req;
        return User
            .scope('profile')
            .findByPk(id, { attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] } })
            .then(handleEntityNotFound(res, 'User'))
            .then(user => {
                console.log(Object.keys(user.__proto__));
                return res.status(200).send(user)
            })
            .catch(handleError(res));
    },
    update: (req, res) => {
        const { params: { userId } } = req;
        const user = req.body;
    },
    destroy: (req, res) => {
        const { params: { userId } } = req;
        return User
            .destroy({ where: { userId: userId } })
            .then(respondWithResult(res, 204))
            .catch(handleError(res));
    },
    forgotPassword: (req, res) => {
        const { body: { email } } = req;
        return User
            .scope('verified')
            .findOne({ where: { email: email } })
            .then(user => {
                if (!user) return res.status(404).json('User not found!');

                const message = {
                    link: `${config.apiUrl}/request-reset-password/?email=${user.email}`,
                    username: user.email.split('@')[0]
                }
                const mailer = new NodeMailer(email);
                mailer
                    .setTemplate('reset-password', message)
                    .setSubject('Password Reset Request')
                    .sendHtml();
                return res.status(200).json('Email has been sent. Check your email for instructions!');
            })
            .catch(handleError(res));
    },
}

module.exports = controller;