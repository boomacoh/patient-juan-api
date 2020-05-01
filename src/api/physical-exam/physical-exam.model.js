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
  pelvicExamination: Sequelize.STRING
}, {
  defaultScope: { include: ['vitalSigns', 'antrophometricData'] }
});

PhysicalExam.hasOne(VitalSigns, { as: 'vitalSigns', foreignKey: 'physicalExamId' });
PhysicalExam.hasOne(AntrophometricData, { as: 'antrophometricData', foreignKey: 'physicalExamId' });

module.exports = PhysicalExam;