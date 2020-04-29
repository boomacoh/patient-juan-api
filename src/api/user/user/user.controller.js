const User = require('./user.model');
const Institution = require('../../institution/institution.model');
const { respondWithResult, handleEntityNotFound, handleError, handleErrorMsg } = require('../../../services/handlers');
const NodeMailer = require('../../../utility/mailer');
const config = require('../../../config');

const controller = {
    getAll: async (req, res) => {
        const { query: { type } } = req;
        const scopes = [];
        if (type) scopes.push({ method: ['type', type] });

        return await User
            .scope(scopes)
            .findAll()
            .then(handleEntityNotFound(res))
            .then((users) => {
                return res.status(200).send(users)
            })
            .catch(handleError(res));
    },
    getOne: async (req, res) => {
        const { params: { userId } } = req;
        return await User
            .scope('verified', 'profile')
            .findByPk(userId, { attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] } })
            .then(handleEntityNotFound(res))
            .then(user => {
                return res.status(200).send(user)
            })
            .catch(handleError(res));
    },
    update: async (req, res) => {
        const { params: { userId } } = req;
        const user = req.body;
    },
    destroy: async (req, res) => {
        const { params: { userId } } = req;
        await User.delete({ where: { userId: userId } })
            .then(respondWithResult(res, 204))
            .catch(handleError(res));
    },
    forgotPassword: async (req, res) => {
        const { body: { email } } = req;
        return await User
            .scope('verified')
            .findOne({ where: { email: email } })
            .then(user => {
                if (!user) return res.status(404).send('User not found!');

                const message = {
                    link: `${config.apiUrl}/request-reset-password/?email=${user.email}`,
                    username: user.email.split('@')[0]
                }
                const mailer = new NodeMailer(email);
                mailer
                    .setTemplate('reset-password', message)
                    .setSubject('Password Reset Request')
                    .sendHtml();
                return res.status(200).send('Email has been sent. Check your email for instructions!');
            })
            .catch(handleError(res));
    },
}

module.exports = controller;