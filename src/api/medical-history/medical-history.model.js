const Sequelize = require('sequelize');
const { FamilyMedicalHistory, ObGyneHistory, PastMedicalHistory, SocialPersonalHistory } = require('./histories');

const MedicalHistory = sequelize.define('medicalHistory', {
    medicalHistoryId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
}, {
    freezeTableName: true,
    defaultScope: { include: [{ all: true }] }
});

MedicalHistory.hasOne(PastMedicalHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(FamilyMedicalHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(ObGyneHistory, { foreignKey: 'medicalHistoryId' });
MedicalHistory.hasOne(SocialPersonalHistory, { foreignKey: 'medicalHistoryId' });

module.exports =  MedicalHistory ;


