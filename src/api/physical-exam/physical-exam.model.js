const Sequelize = require('sequelize');

const PhysicalExam = sequelize.define('physicalExam', {
  generalSurvey: Sequelize.STRING,
  heent: Sequelize.STRING,
  chestAndLungs: Sequelize.STRING,
  cardiovascular: Sequelize.STRING,
  abdomen: Sequelize.STRING,
  skinBackExtremities: Sequelize.STRING,
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
}, {
  setterMethods: {
    generalSurvey(value) {
      if (!value) return this.setDataValue('generalSurvey', 'Not Done');
      this.setDataValue('generalSurvey', value);
    },
    heent(value) {
      if (!value) return this.setDataValue('heent', 'Not Done');
      this.setDataValue('heent', value);
    },
    chestAndLungs(value) {
      if (!value) return this.setDataValue('chestAndLungs', 'Not Done');
      this.setDataValue('chestAndLungs', value);
    },
    cardiovascular(value) {
      if (!value) return this.setDataValue('cardiovascular', 'Not Done');
      this.setDataValue('cardiovascular', value);
    },
    abdomen(value) {
      if (!value) return this.setDataValue('abdomen', 'Not Done');
      this.setDataValue('abdomen', value);
    },
    skinBackExtremities(value) {
      if (!value) return this.setDataValue('skinBackExtremities', 'Not Done');
      this.setDataValue('skinBackExtremities', value);
    },
    nervousSystem(value) {
      if (!value) return this.setDataValue('nervousSystem', 'Not Done');
      this.setDataValue('nervousSystem', value);
    },
    rectalExamination(value) {
      if (!value) return this.setDataValue('rectalExamination', 'Not Done');
      this.setDataValue('rectalExamination', value);
    },
    pelvicExamination(value) {
      if (!value) return this.setDataValue('pelvicExamination', 'Not Done');
      this.setDataValue('pelvicExamination', value);
    },
  }
});


module.exports = PhysicalExam;