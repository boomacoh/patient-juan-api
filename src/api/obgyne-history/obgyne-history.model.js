const Sequelize = require('sequelize');
const Patient = require('../patient/patient.model');

const ObGyneHistory = sequelize.define('obgyne_history', {
    obgyneHistoryId: Sequelize.INTEGER(11),
    patientId: Sequelize.INTEGER(11)
});

ObGyneHistory.belongsTo(Patient, { foreignKey: 'patientId' })

module.exports = ObGyneHistory;


