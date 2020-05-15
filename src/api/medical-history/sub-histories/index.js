const Sequelize = require('sequelize');

const Allergy = sequelize.define('allergy', {
  trigger: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const PastIllness = sequelize.define('pastIllness', {
  illness: Sequelize.STRING,
  remarks: Sequelize.STRING,
  parent: Sequelize.STRING
}, {
  scopes: {
    parent(parent) { return { where: { parent: parent } } }
  }
});

const Surgery = sequelize.define('surgery', {
  approximateDate: Sequelize.DATEONLY,
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

// PastIllness.removeAttribute('id');

// Illness.removeAttribute('id');
// Allergy.removeAttribute('id');
// Surgery.removeAttribute('id');
// Medication.removeAttribute('id');
// Substance.removeAttribute('id');

module.exports = { Allergy, Medication, Surgery, PastIllness, Substance }