const Sequelize = require('sequelize');
const { Allergy, PastIllness, Medication, Substance, Surgery } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false }
}, {
  freezeTableName: true,
  defaultScope: {
    include: [
      { model: Allergy, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: PastIllness, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Medication, attributes: { exclude: ['createdAt', 'updatedAt'] } },
      { model: Surgery, attributes: { exclude: ['createdAt', 'updatedAt'] } }
    ]
  }
});

PastMedicalHistory.hasMany(Allergy);
PastMedicalHistory.hasOne(PastIllness, { foreignKey: 'parentId', scope: { parent: 'pmh' } });
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(Surgery);

const FamilyMedicalHistory = sequelize.define('familyMedicalHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false }
}, {
  freezeTableName: true,
  defaultScope: { include: [{ model: PastIllness, attributes: { exclude: ['createdAt', 'updatedAt', 'id'] } }] }
});

FamilyMedicalHistory.hasOne(PastIllness, { foreignKey: 'parentId', scope: { parent: 'fmh' } });

const SocialPersonalHistory = sequelize.define('socialPersonalHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false },
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


