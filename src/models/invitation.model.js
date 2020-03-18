const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('../config');

const statuses = ['pending', 'approved', 'cancelled', 'expired'];

const Invitation = sequelize.define('invitation', {
  invitationId: { type: Sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
  email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: { args: true, msg: 'Email is invalid!' } } },
  institutionId: { type: Sequelize.STRING, allowNull: false },
  access: {
    type: Sequelize.STRING,
    set(value) {
      this.setDataValue('access', value.join(';'));
    },
    get() {
      return this.getDataValue('access').split(';');
    }
  },
  status: { type: Sequelize.ENUM({ values: statuses }), allowNull: false, defaultValue: 'pending', validate: { isIn: { args: [statuses] } } },
  invitedBy: { type: Sequelize.STRING, allowNull: false },
  token: { type: Sequelize.STRING(2000), allowNull: false }
}, {
  scopes: {
    pending: {
      where: {
        status: 'pending'
      }
    }
  }
});

Invitation.prototype.createTokenSignature = function () {
  const today = new Date();
  const expiration = new Date(today);
  // expiration.setDate(today.getDate() + 1);
  expiration.setMinutes(today.getMinutes() + 2);

  return jwt.sign({
    invitationId: this.invitationId,
    exp: parseInt(expiration.getTime() / 1000, 10)
  }, config.jwtSecret);
}

Invitation.prototype.generateToken = function () {
  return { token: this.createTokenSignature() }
}

module.exports = Invitation;