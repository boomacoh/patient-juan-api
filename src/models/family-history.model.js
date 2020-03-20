const Sequelize = require('sequelize');
const Patient = require('../models/patient.model');

const FamilyHistory = sequelize.define('family_history', {
    famHistoryId: Sequelize.INTEGER(11),
    patientId: Sequelize.INTEGER(11)
});

FamilyHistory.belongsTo(Patient, { foreignKey: 'patientId' })

module.exports = FamilyHistory;


