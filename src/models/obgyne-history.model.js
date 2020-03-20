const Sequelize = require('sequelize');
const Patient = require('../models/patient.model');

const ObGyneHistory = sequelize.define('obgyne_history', {
    obgyneHistoryId: Sequelize.INTEGER(11),
    patientId: Sequelize.INTEGER(11)
});

ObGyneHistory.belongsTo(Patient, { foreignKey: 'patientId' })

module.exports = ObGyneHistory;


