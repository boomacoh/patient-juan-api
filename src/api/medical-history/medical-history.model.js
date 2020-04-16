const Sequelize = require('sequelize');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');
const { Allergy, Illness, Medication, Substance, Surgery } = require('./sub-histories');

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

module.exports = MedicalHistory;


