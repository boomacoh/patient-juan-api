const Sequelize = require('sequelize');
const Patient = require('../patient/patient.model');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Allergy, PastIllness, Medication, Substance, Surgery } = require('./sub-histories');

const MedicalHistory = sequelize.define('medicalHistory', {
    medicalHistoryId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
}, {
    defaultScope: { include: [{ all: true, attributes: { exclude: ['createdAt', 'updatedAt', 'medicalHistoryId'] } }] },
    freezeTableName: true
});

MedicalHistory.hasOne(PastMedicalHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(FamilyMedicalHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(ObGyneHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(SocialPersonalHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasOne(MedicalHistory, {foreignKey: 'patientId'});

module.exports = MedicalHistory;


