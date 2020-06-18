const Sequelize = require('sequelize');
const Patient = require('../patient/patient.model');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Allergy, PastIllness, Medication, Substance, Surgery } = require('./sub-histories');

const MedicalHistory = sequelize.define('medicalHistory', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
}, {
    freezeTableName: true,
    scopes: {
        all: {
            include: [{ all: true }]
        }
    }
});

MedicalHistory.hasOne(PastMedicalHistory);
MedicalHistory.hasOne(FamilyMedicalHistory);
MedicalHistory.hasOne(ObGyneHistory);
MedicalHistory.hasOne(SocialPersonalHistory);
MedicalHistory.belongsTo(Patient);
Patient.hasOne(MedicalHistory);

module.exports = MedicalHistory;


