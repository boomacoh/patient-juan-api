const Sequelize = require('sequelize');
const Drug = require('./drug.model');
const Diagnostic = require('./diagnostic.model');

const Plan = sequelize.define('plan', {
  diet: Sequelize.STRING,
  disposition: Sequelize.STRING
}, {
  defaultScope: { include: [Drug, Diagnostic] }
});

Plan.hasMany(Drug);
Plan.hasMany(Diagnostic);

module.exports = Plan;