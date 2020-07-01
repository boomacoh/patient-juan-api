const Sequelize = require('sequelize');

const Allergy = sequelize.define('allergy', {
  trigger: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const MedicalCondition = sequelize.define('medicalConditions', {
  condition: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.STRING,
  dateOccured: Sequelize.STRING,
  parent: { type: Sequelize.STRING, allowNull: false }
});

const Surgery = sequelize.define('surgery', {
  approximateDate: Sequelize.STRING,
  type: Sequelize.STRING,
  reason: Sequelize.STRING,
  complications: Sequelize.STRING
});

const Medication = sequelize.define('medication', {
  generic: { type: Sequelize.STRING, allowNull: false },
  brand: Sequelize.STRING,
  preparation: Sequelize.STRING,
  frequency: Sequelize.STRING,
  route: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const Substance = sequelize.define('substance', {
  substance: Sequelize.STRING,
  substanceIntake: Sequelize.STRING,
  remarks: Sequelize.STRING
});

module.exports = { Allergy, Medication, Surgery, Substance, MedicalCondition }