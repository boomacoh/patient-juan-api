const User = require('../../models/user.model');
const { respondWithResult, handleEntityNotFound, handleError, handleErrorMsg } = require('../../services/handlers');
const passport = require('passport');
const NodeMailer = require('../../utility/mailer');
const config = require('../../config');

const controller = {
    register: async (req, res) => {
        const { body: { email, password, access } } = req;

        if (!email) return handleErrorMsg(res, 422, 'Email must not be empty!');
        if (!password) return handleErrorMsg(res, 422, 'Password must not be empty!');
        if (!access) return handleErrorMsg(res, 422, 'Access must not be empty!');

        const newUser = await User.build({
            email: email,
            password: password,
            access: access
        });

        await newUser.setPassword(password);

        return await newUser.save()
            .then(handleEntityNotFound(res))
            .then(user => {
                const mailer = new NodeMailer(user.email);

                const message = {
                    email: user.email,
                    link: `this-link`
                }

                mailer
                    .setTemplate('verify-email', message)
                    .setSubject('Verify Email Address')
                    .sendHtml();

                return user;
            })
            .then(respondWithResult(res))
            .catch(handleError(res))
    },
    getEntries: async (req, res) => {
        
        return await User.findAll({ attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] } })
            .then(handleEntityNotFound(res))
            .then((users) => res.status(200).send(users))
            .catch(handleError(res));
    },
    getEntry: async (req, res) => {

        return await User.findOne(condition, { attributes: { exclude: ['createdAt', 'updatedAt', 'hash', 'salt'] } })
            .then(handleEntityNotFound(res))
            .then(user => res.status(200).send(user))
            .catch(handleError(res));
    },
    update: async (req, res) => {

    },
    verifyEmail: async (req, res) => {
        const { params: { userId, email } } = req;

    },
    login: async (req, res, next) => {
        const { body: { email, password } } = req;
        if (!email) return handleErrorMsg(res, 422, 'Email is required!');
        if (!password) return handleErrorMsg(res, 422, 'Password is required!');

        return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
            if (err) return next(info);
            if (passportUser) {
                const user = passportUser;
                user.token = passportUser.createTokenSignature();
                return res.status(200).send(user.generateToken());
            }
            return res.status(401).send(info);
        })(req, res, next);

    }
}

module.exports = controller;