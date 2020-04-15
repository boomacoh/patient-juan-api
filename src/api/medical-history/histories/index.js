const Sequelize = require('sequelize');
const { Allergy, Illness, Medication, Substance, Surgery } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
  unremarkable: { type: Sequelize.BOOLEAN }
}, {
  freezeTableName: true,
  defaultScope: { include: [{ all: true }] }
});

PastMedicalHistory.hasMany(Illness)
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(Surgery);

const FamilyMedicalHistory = sequelize.define('familyMedicalHistory', {
  unremarkable: Sequelize.BOOLEAN
}, {
  freezeTableName: true,
  defaultScope: { include: [{ all: true }] }
});

FamilyMedicalHistory.hasMany(Illness);

const SocialPersonalHistory = sequelize.define('socialPersonalHistory', {
  unremarkable: Sequelize.BOOLEAN,
  lifestyle: Sequelize.STRING
}, {
  freezeTableName: true,
  defaultScope: { include: [{ all: true }] }
});

SocialPersonalHistory.hasMany(Substance);

const ObGyneHistory = sequelize.define('obGyneHistory', {
  unremarkable: Sequelize.BOOLEAN,
  referringOB: Sequelize.STRING,
  gravidity: Sequelize.INTEGER,
  fullTermPregnancy: Sequelize.INTEGER,
  noOfMiscarriage: Sequelize.INTEGER,
  ageOfFirstMenstruation: Sequelize.INTEGER,
  lastMenstruationPeriod: Sequelize.INTEGER,
  parity: Sequelize.INTEGER,
  noOfAbortion: Sequelize.INTEGER,
  noOfLivingChildren: Sequelize.INTEGER,
  periodDuration: Sequelize.INTEGER,
  lastPapsmearDate: Sequelize.DATEONLY,
  lastPapsmearRemarks: Sequelize.STRING
}, {
  freezeTableName: true
});


module.exports = { PastMedicalHistory, SocialPersonalHistory, ObGyneHistory, FamilyMedicalHistory };


