const Sequelize = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = sequelize.define('user', {
    userId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: { args: true, msg: 'That email is already taken' }, validate: { isEmail: { args: true, msg: 'That is not a valid email address!' } } },
    access: { type: Sequelize.ENUM({ values: ['physician', 'clinic-staff', 'patient'] }), allowNull: false },
    hash: Sequelize.STRING(1500),
    salt: Sequelize.STRING(255),
    verified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false }
});

User.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

User.prototype.validatePassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

User.prototype.generateJWT = function () {
    const today = new Date();
    const expiration = new Date();
    expiration.setDate(today.getDate() + 10);

    return jwt.sign({
        userId: this.userId,
        access: this.access,
        expiration: parseInt(expiration.getTime() / 1000, 10)
    }, config.jwtSecret);
}

User.prototype.toAuthJson = function () {
    return { token: this.generateJWT() };
}

module.exports = User;