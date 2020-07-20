const Sequelize = require('sequelize');
const Drug = require('./drug.model');
const DiagnosticTest = require('./diagnostic-test.model');

const Plan = sequelize.define('plan', {
  diet: Sequelize.STRING,
  disposition: Sequelize.STRING,
  specificInstructions: Sequelize.STRING,
  followUpDate: { type: Sequelize.DATEONLY, defaultValue: null },
  followUpTime: { type: Sequelize.TIME, defaultValue: null },
  followUpInstructions: Sequelize.TEXT
}, {
  defaultScope: { include: [Drug, DiagnosticTest] },
});

Plan.hasMany(Drug);
Plan.hasMany(DiagnosticTest);

module.exports = Plan;