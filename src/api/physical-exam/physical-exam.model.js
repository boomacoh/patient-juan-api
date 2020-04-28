const Sequelize = require('sequelize');

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
})


module.exports = PhysicalExam;