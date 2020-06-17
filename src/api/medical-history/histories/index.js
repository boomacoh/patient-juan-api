const Sequelize = require('sequelize');
const { Allergy, PastIllness, Medication, Substance, Surgery } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
}, {
  freezeTableName: true,
  defaultScope: { include: [Allergy, PastIllness, Medication, Surgery] }
});

PastMedicalHistory.hasMany(Allergy);
PastMedicalHistory.hasMany(PastIllness, { foreignKey: 'parentId', scope: { parent: 'pmh' } });
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(Surgery);

const FamilyMedicalHistory = sequelize.define('familyMedicalHistory', {
}, {
  freezeTableName: true,
  defaultScope: { include: [PastIllness] }
});

FamilyMedicalHistory.hasMany(PastIllness, { foreignKey: 'parentId', scope: { parent: 'fmh' } });

const SocialPersonalHistory = sequelize.define('socialPersonalHistory', {
  lifestyle: Sequelize.STRING
}, {
  freezeTableName: true,
  defaultScope: { include: [Substance] }
});

SocialPersonalHistory.hasMany(Substance);

const ObGyneHistory = sequelize.define('obGyneHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false },
  referringOB: Sequelize.STRING,
  gravidity: Sequelize.INTEGER,
  fullTermPregnancy: Sequelize.INTEGER,
  noOfMiscarriage: Sequelize.INTEGER,
  ageOfFirstMenstruation: Sequelize.INTEGER,
  lastMenstruationPeriod: Sequelize.DATEONLY,
  parity: Sequelize.INTEGER,
  noOfAbortion: Sequelize.INTEGER,
  noOfLivingChildren: Sequelize.INTEGER,
  periodDuration: Sequelize.INTEGER,
  lastPapsmearDate: Sequelize.DATEONLY,
  lastPapsmearRemarks: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    lastMenstruationPeriod(value) {
      if (!value) this.setDataValue('lastMenstruationPeriod', null);
    },
    lastPapsmearDate(value) {
      if (!value) this.setDataValue('lastPapsmearDate', null);
    }

  }
});


module.exports = { PastMedicalHistory, SocialPersonalHistory, ObGyneHistory, FamilyMedicalHistory };


