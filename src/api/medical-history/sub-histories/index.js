const Sequelize = require('sequelize');

const Allergy = sequelize.define('allergy', {
  trigger: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const Illness = sequelize.define('illness', {
  illness: Sequelize.STRING,
  remarks: Sequelize.STRING,
  parent: Sequelize.STRING
});

const Surgery = sequelize.define('surgery', {
  approxDate: Sequelize.DATEONLY,
  type: Sequelize.STRING,
  reason: Sequelize.STRING,
  complications: Sequelize.STRING
});

const Medication = sequelize.define('medication', {
  generic: Sequelize.STRING,
  brand: Sequelize.STRING,
  preparation: Sequelize.STRING,
  frequency: Sequelize.STRING,
  route: Sequelize.STRING,
  purpose: Sequelize.STRING
});

const Substance = sequelize.define('substance', {
  substance: Sequelize.STRING,
  remarks: Sequelize.STRING
});

module.exports = { Allergy, Medication, Surgery, Illness, Substance }