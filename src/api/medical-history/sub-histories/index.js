const Sequelize = require('sequelize');

const MedicalCondition = sequelize.define('medicalCondition', {
  condition: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.STRING,
  dateOccured: Sequelize.STRING,
  parent: { type: Sequelize.STRING, allowNull: false }
});

const Medication = sequelize.define('medication', {
  generic: { type: Sequelize.STRING, allowNull: false },
  brand: Sequelize.STRING,
  preparation: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const ChildHoodDisease = sequelize.define('childhoodDisease', {
  disease: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.TEXT
});

const Hospitalization = sequelize.define('hospitalization', {
  approximateDate: Sequelize.STRING,
  reason: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.TEXT
});

const Surgery = sequelize.define('surgery', {
  approximateDate: Sequelize.STRING,
  type: { type: Sequelize.STRING, allowNull: false },
  reason: Sequelize.STRING,
  remarks: Sequelize.TEXT
});

const Injury = sequelize.define('injury', {
  approximateDate: Sequelize.STRING,
  type: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.TEXT
});

const BloodTransfusion = sequelize.define('bloodTransfusion', {
  approximateDate: { type: Sequelize.STRING, allowNull: false },
  indications: Sequelize.STRING,
  remarks: Sequelize.TEXT
});

const Allergy = sequelize.define('allergy', {
  trigger: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.STRING
});

const Psychiatric = sequelize.define('psychiatric', {
  approximateDate: { type: Sequelize.STRING, allowNull: false },
  remarks: Sequelize.TEXT
});

const Birth = sequelize.define('birth', {
  sex: { type: Sequelize.STRING, allowNull: false },
  modeOfDelivery: Sequelize.STRING,
  weight: Sequelize.FLOAT,
  currentStatus: Sequelize.STRING,
  remarks: Sequelize.TEXT
});

const Pregnancy = sequelize.define('pregnancy', {
  term: Sequelize.STRING,
  ageOfGestation: Sequelize.STRING,
  dateOfDelivery: { type: Sequelize.DATEONLY, defaultValue: null },
  type: Sequelize.STRING
}, {
  defaultScope: { include: [Birth] }
});

Pregnancy.hasMany(Birth, { onDelete: 'CASCADE' });

module.exports = { MedicalCondition, Medication, ChildHoodDisease, Hospitalization, Surgery, Injury, BloodTransfusion, Allergy, Psychiatric, Pregnancy, Birth }