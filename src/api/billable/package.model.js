const Sequelize = require('sequelize');
const Billable = require('./billlable.model');

const Package = sequelize.define('package', {
  name: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false }
}, {
  defaultScope: { include: [{ all: true }] }
});

module.exports = Package;
