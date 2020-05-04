const Sequelize = require('sequelize');
const VitalSigns = require('./vital-signs.model');
const AntrophometricData = require('./antrophometric-data.model');

const PhysicalExam = sequelize.define('physicalExam', {
  generalSurvey: Sequelize.STRING,
  heent: Sequelize.STRING,
  chestAndLungs: Sequelize.STRING,
  cardiovascular: Sequelize.STRING,
  abdomen: Sequelize.STRING,
  skinBackExtremeties: Sequelize.STRING,
  nervousSystem: Sequelize.STRING,
  rectalExamination: Sequelize.STRING,
  pelvicExamination: Sequelize.STRING,
  vsHead: Sequelize.STRING,
  vsSystolic: Sequelize.STRING,
  vsDiastolic: Sequelize.STRING,
  vsHeartRate: Sequelize.STRING,
  vsRespiratoryRate: Sequelize.STRING,
  vsOxygenRate: Sequelize.STRING,
  vsTemperatureMethod: Sequelize.STRING,
  vsTemperature: Sequelize.STRING,
  vsTemperatureRemarks: Sequelize.STRING,
  adHead: Sequelize.STRING,
  adHeight: Sequelize.STRING,
  adWeight: Sequelize.STRING,
  adRemarks: Sequelize.STRING,
});


module.exports = PhysicalExam;