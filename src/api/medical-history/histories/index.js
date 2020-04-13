const Sequelize = require('sequelize');
const { Allergies, Illnesses, Medication, Surgeries, SubSocialPersonalHistory } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
  unremarkable: { type: Sequelize.BOOLEAN }
}, {
  freezeTableName: true
}, {
  defaultScope: { include: [{ all: true }] }
});

PastMedicalHistory.hasMany(Illnesses, { foreignKey: 'parentId', scope: { parent: 'pastMedicalHistory' } });
PastMedicalHistory.hasMany(Allergies);
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(Surgeries);

const FamilyMedicalHistory = sequelize.define('familyMedicalHistory', {
  unremarkable: Sequelize.BOOLEAN
}, {
  freezeTableName: true
}, {
  defaultScope: { include: [{ all: true }] }
});

FamilyMedicalHistory.hasMany(Illnesses, { foreignKey: 'parentId', scope: { parent: 'familyMedicalHistory' } });

const SocialPersonalHistory = sequelize.define('socialPersonalHistory', {
  lifestyle: Sequelize.STRING
}, {
  freezeTableName: true
}, {
  defaultScope: { include: [{ all: true }] }
});

SocialPersonalHistory.hasMany(SubSocialPersonalHistory);

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
  lastPapsmear: Sequelize.DATEONLY,
  lastPapsmearRemarks: Sequelize.STRING
}, {
  freezeTableName: true
});


module.exports = { PastMedicalHistory, SocialPersonalHistory, ObGyneHistory, FamilyMedicalHistory };


