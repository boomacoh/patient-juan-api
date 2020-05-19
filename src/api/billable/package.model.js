const Sequelize = require('sequelize');
const Billable = require('./billlable.model');

const Package = sequelize.define('package', {
  name: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false }
}, {
  defaultScope: { include: [{ all: true }] }
});

Package.belongsToMany(Billable, { through: 'billable_packages', as: 'billables' });
Billable.belongsToMany(Package, { through: 'billable_packages', as: 'packages' });

module.exports = Package;
