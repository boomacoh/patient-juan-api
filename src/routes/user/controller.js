const User = require('../../models/user.model');
const { respondWithResult, handleEntityNotFound, handleError, handleErrorMsg } = require('../../services/handlers');
const passport = require('passport');

const controller = {
    getEntries: async (req, res) => {
        return await User.findAll()
            .then(handleEntityNotFound(res))
            .then((users) => res.status(200).send(users))
            .catch(handleError(res));
        // .then(users => res.send(users))
        // .catch(err => res.send(err));
    },
    login: async (req, res, next) => {
        const { body: { email, password } } = req;

        return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
            if (err) return next(info);
            if (passportUser) {
                const user = passportUser;
                return res.send(user);
            }
            return res.status(401).send(info);
        })(req, res, next);

    },
    register: async (req, res) => {
        const { body: { email, password } } = req;
        const newUser = await User.build({
            email: email,
            password: password
        });
        newUser.setPassword(password);
        return await newUser.save()
            .then(user => {
                // return res.send({
                //     userId: user.userId,
                //     message: 'Successful Registration'
                // })
                res.send(user)
            })
            .catch(err => res.send(err.toString()));
    }
}

module.exports = controller;