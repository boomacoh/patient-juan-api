const Sequelize = require('sequelize');
const Billable = require('./billlable.model');

const Package = sequelize.define('package', {
  name: { type: Sequelize.STRING, allowNull: false, unique: { args: true, msg: 'Package with that name already exists' } },
  price: { type: Sequelize.FLOAT, allowNull: false }
}, {
  defaultScope: {
    include: 'billables'
  }
});

Package.belongsToMany(Billable, { through: 'billable_packages', as: 'billables' });
Billable.belongsToMany(Package, { through: 'billable_packages', as: 'packages', onDelete: 'CASCADE' });

module.exports = Package;
