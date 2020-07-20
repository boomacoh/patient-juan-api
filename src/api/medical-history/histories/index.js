const Sequelize = require('sequelize');
const { MedicalCondition, Medication, ChildHoodDisease, Hospitalization, Surgery, Injury, BloodTransfusion, Allergy, Psychiatric, Pregnancy } = require('../sub-histories');

const PastMedicalHistory = sequelize.define('pastMedicalHistory', {
}, {
  freezeTableName: true,
  defaultScope: { include: [MedicalCondition, Medication, ChildHoodDisease, Hospitalization, Surgery, Injury, BloodTransfusion, Allergy, Psychiatric] }
});

PastMedicalHistory.hasMany(MedicalCondition, { foreignKey: 'parentId', scope: { parent: 'pmh' } });
PastMedicalHistory.hasMany(Medication);
PastMedicalHistory.hasMany(ChildHoodDisease);
PastMedicalHistory.hasMany(Hospitalization);
PastMedicalHistory.hasMany(Surgery);
PastMedicalHistory.hasMany(Injury);
PastMedicalHistory.hasMany(BloodTransfusion);
PastMedicalHistory.hasMany(Allergy);
PastMedicalHistory.hasMany(Psychiatric);

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
  freezeTableName: true
});

const ObGyneHistory = sequelize.define('obGyneHistory', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false },
  gravidity: { type: Sequelize.INTEGER },
  parity: { type: Sequelize.INTEGER },
  termPregnancy: { type: Sequelize.INTEGER },
  preTermPregnancy: { type: Sequelize.INTEGER },
  noOfAbortion: { type: Sequelize.INTEGER },
  noOfLivingChildren: { type: Sequelize.INTEGER },
  menarche: Sequelize.STRING,
  interval: Sequelize.STRING,
  duration: Sequelize.STRING,
  amount: Sequelize.STRING,
  symptoms: Sequelize.STRING,
  contraception: Sequelize.STRING,
  lastPapsmear: Sequelize.STRING,
  lastMenstruationPeriod: { type: Sequelize.DATEONLY, defaultValue: null },
  previousMenstruationPeriod: { type: Sequelize.DATEONLY, defaultValue: null },
  AOGbyLMP: { type: Sequelize.STRING, comment: 'current date - last menstruation period (by weeks)' },
  lastUltrasoundDate: { type: Sequelize.DATEONLY, defaultValue: null },
  AOGinLastUltrasoundW: Sequelize.INTEGER,
  AOGinLastUltrasoundD: Sequelize.INTEGER,
  AOGbyUTZ: { type: Sequelize.STRING, comment: 'current date - last ultrasound date' },
  EDDfromLMP: { type: Sequelize.DATEONLY, comment: 'last menstruation period + 280 days', defaultValue: null },
  EDDfromUTZ: { type: Sequelize.DATEONLY, comment: '(last ultrasound date + 280 days) - AOG in last ultrasound', defaultValue: null }
}, {
  freezeTableName: true,
  defaultScope: { include: [Pregnancy] }
});

ObGyneHistory.hasMany(Pregnancy);


module.exports = { PastMedicalHistory, SocialPersonalHistory, ObGyneHistory, FamilyMedicalHistory };


