const Sequelize = require('sequelize');

const Allergies = sequelize.define('allergies', {
  trigger: Sequelize.STRING,
  remarks: Sequelize.STRING
}, {
  freezeTableName: true
});

const Illnesses = sequelize.define('illnesses', {
  illness: Sequelize.STRING,
  remarks: Sequelize.STRING,
  parent: Sequelize.STRING
})

const Surgeries = sequelize.define('surgeries', {
  approxDate: Sequelize.DATEONLY,
  type: Sequelize.STRING,
  reason: Sequelize.STRING,
  complications: Sequelize.STRING
}, {
  freezeTableName: true
});

const Medication = sequelize.define('medication', {
  generic: Sequelize.STRING,
  brand: Sequelize.STRING,
  preparation: Sequelize.STRING,
  frequency: Sequelize.STRING,
  route: Sequelize.STRING,
  purpose: Sequelize.STRING
}, {
  freezeTableName: true
});

const SubSocialPersonalHistory = sequelize.define('subSocialPersonalHistory', {
  substance: Sequelize.STRING,
  remarks: Sequelize.STRING
})

module.exports = { Allergies, Medication, Surgeries, Illnesses, SubSocialPersonalHistory }