// const Sequelize = require('sequelize');
// const crypto = require('crypto');
import Sequelize from 'sequelize';
import crypto from 'crypto';

const User = sequelize.define('user', {
    userId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
    hash: Sequelize.TEXT,
    salt: Sequelize.STRING
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
    var today = new Date();
    var expiration = new Date();
    expiration.setDate(today.getDate() + 10);
}

module.exports = User;