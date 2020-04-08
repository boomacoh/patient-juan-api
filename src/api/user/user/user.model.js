const Sequelize = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const User = sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: { args: true, msg: 'That email is already taken' },
        validate: { isEmail: { args: true, msg: 'That is not a valid email address!' } }
    },
    hash: Sequelize.STRING(2000),
    salt: Sequelize.STRING(255),
    verified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
    verifyToken: { type: Sequelize.STRING(1000) }
}, {
    scopes: {
        verified: { where: { verified: true } }
    }
});

User.prototype.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

User.prototype.validatePassword = function (password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

User.prototype.createTokenSignature = function (institutionInfo) {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 1);

    return jwt.sign({
        userId: this.userId,
        exp: parseInt(expiration.getTime() / 1000, 10),
        institutionId: institutionInfo.institutionId,
        access: institutionInfo.access
    }, config.jwtSecret);
}

User.prototype.createVerifyToken = function () {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 1);

    return jwt.sign({
        exp: parseInt(expiration.getTime() / 1000, 10)
    }, config.jwtSecret);
}

User.prototype.generateToken = function (institutionInfo) {
    return this.createTokenSignature(institutionInfo);
}

module.exports = User;