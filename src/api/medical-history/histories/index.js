const Sequelize = require('sequelize');
const { Allergy, Medication, Substance, Surgery, MedicalCondition } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
}, {
  freezeTableName: true,
  defaultScope: { include: [Allergy, Medication, Surgery, MedicalCondition] }
});

PastMedicalHistory.hasMany(Allergy);
PastMedicalHistory.hasMany(MedicalCondition, { foreignKey: 'parentId', scope: { parent: 'pmh' } });
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(Surgery);

const FamilyMedicalHistory = sequelize.define('familyMedicalHistory', {
}, {
  freezeTableName: true,
  defaultScope: { include: [MedicalCondition] }
});

FamilyMedicalHistory.hasMany(MedicalCondition, { foreignKey: 'parentId', scope: { parent: 'fmh' } });

const SocialPersonalHistory = sequelize.define('socialPersonalHistory', {
  educationalAttainment: Sequelize.STRING,
  hcp: { type: Sequelize.STRING, comment: 'Health Condition of Partner' },
  natureOfWork: Sequelize.STRING,
  nheh: { type: Sequelize.STRING, comment: 'No of Hours Exposed to Hazards' },
  smu: { type: Sequelize.STRING, comment: 'Safety Measures Used' },
  irfr: { type: Sequelize.STRING, comment: 'Interpersonal Relationship and Financial Resources' },
  sourceOfWater: Sequelize.STRING,
  wasteDisposal: Sequelize.STRING,
  travelHistory: Sequelize.TEXT,
  srp: { type: Sequelize.STRING, comment: 'Sleep and Rest Pattern' },
  ne: { type: Sequelize.STRING, comment: 'Nutrition and Elimination' },
  activities: Sequelize.STRING,
  exercise: Sequelize.STRING,
  alcoholIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  alcoholIntakeRemarks: Sequelize.TEXT,
  caffeineIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  caffeineIntakeRemarks: Sequelize.TEXT,
  tobaccoIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  tobaccoIntakeRemarks: Sequelize.TEXT,
  recreationalDrugIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  recreationalDrugIntakeRemarks: Sequelize.TEXT,
  supplementIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  supplementIntakeRemarks: Sequelize.TEXT,
  otherIntake: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  otherIntakeRemarks: Sequelize.TEXT,
  isSexuallyActive: { type: Sequelize.STRING, defaultValue: 'Not Asked' },
  isSexuallyActiveRemarks: Sequelize.TEXT,
  hadSti: { type: Sequelize.STRING, comment: 'STI = Sexually Transitted Disease', defaultValue: 'Not Asked' },
  hadStiRemarks: Sequelize.TEXT,
  nvp: { type: Sequelize.TEXT, comment: 'Number and Variety of Partners' }
}, {
  freezeTableName: true,
  defaultScope: { include: [Substance] }
});

SocialPersonalHistory.hasMany(Substance);

const ObGyneHistory = sequelize.define('obGyneHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false },
  gravidity: Sequelize.INTEGER,
  parity: Sequelize.INTEGER,
  termPregnancy: Sequelize.INTEGER,
  noOfAbortion: Sequelize.INTEGER,
  noOfLivingChildren: Sequelize.INTEGER,
  menarche: Sequelize.STRING,
  interval: Sequelize.STRING,
  duration: Sequelize.STRING,
  amount: Sequelize.STRING,
  symptoms: Sequelize.STRING,
  contraception: Sequelize.STRING,
  lastPapsmear: Sequelize.STRING,
  lastMenstruationPeriod: Sequelize.DATEONLY,
  previousMenstruationPeriod: Sequelize.DATEONLY,
  AOGbyLMP: { type: Sequelize.DATEONLY, comment: 'current date - last menstruation period (by weeks)' },
  lastUltrasoundDate: Sequelize.DATEONLY,
  AOGinLastUltrasoundW: Sequelize.INTEGER,
  AOGinLastUltraSoundD: Sequelize.INTEGER,
  AOGbyUTZ: { type: Sequelize.DATEONLY, comment: 'current date - last ultrasound date' },
  EDDfromLMP: { type: Sequelize.DATEONLY, comment: 'last menstruation period + 280 days' }
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


