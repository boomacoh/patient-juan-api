const Sequelize = require('sequelize');
const Patient = require('../models/patient.model');

const MedicalHistory = sequelize.define('medical-history', {
    medHistoryId: Sequelize.INTEGER(11),
    patientId: Sequelize.INTEGER(11)
});

MedicalHistory.belongsTo(Patient, { foreignKey: 'patientId' })

module.exports = MedicalHistory;


