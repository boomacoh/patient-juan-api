const Sequelize = require('sequelize');

const VitalSigns = sequelize.define('vitalSigns', {
  systolic: Sequelize.STRING,
  diastolic: Sequelize.STRING,
  heartRate: Sequelize.STRING,
  respiratoryRate: Sequelize.STRING,
  oxygenRate: Sequelize.STRING
});

module.exports = VitalSigns;