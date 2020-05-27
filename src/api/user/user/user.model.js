const Sequelize = require('sequelize');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const Patient = require('../../patient/patient.model');
const Profile = require('../../profile/profile.model');
const Billable = require('../../billable/billlable.model');
const Package = require('../../billable/package.model');

const User = sequelize.define('user', {
    id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
    email: {
        type: Sequelize.STRING(255), allowNull: false, unique: { args: true, msg: 'That email is already taken' },
        validate: { isEmail: { args: true, msg: 'That is not a valid email address!' } }
    },
    hash: Sequelize.STRING(2000),
    salt: Sequelize.STRING(255),
    verified: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
    verifyToken: { type: Sequelize.STRING(1000) }
}, {
    defaultScope: {
        include: [{ model: Profile, required: true }]
    },
    scopes: {
        verified: { where: { verified: true } },
        profile: { include: [{ model: Profile, attributes: { exclude: ['userId'] } }] },
        type(type) { return { attributes: { exclude: ['hash', 'salt'] }, include: [{ model: Profile, where: { type: type } }] } }
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

User.prototype.createTokenSignature = function () {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 1);

    return jwt.sign({
        userId: this.id,
        exp: parseInt(expiration.getTime() / 1000, 10),
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

User.prototype.generateToken = function () {
    return this.createTokenSignature();
}

User.hasOne(Profile, { unique: { args: true, msg: 'User already has existing profile' } });
Profile.belongsTo(User, { unique: { args: true, msg: 'User already has existing profile' } });
User.belongsToMany(Patient, { through: 'physician_patient', freezeTableName: true, foreignKey: 'physicianId' });
Patient.belongsToMany(User, { as: 'physicians', through: 'physician_patient', freezeTableName: true })
User.hasMany(Package);
User.hasMany(Billable);


module.exports = User;