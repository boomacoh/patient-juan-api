const Sequelize = require('sequelize');
const Patient = require('../models/patient.model');

const PersonalSocialHistory = sequelize.define('personal_social_history', {
    pasHistoryId: Sequelize.INTEGER(11),
    patientId: Sequelize.INTEGER(11)
});

PersonalSocialHistory.belongsTo(Patient, { foreignKey: 'patientId' })

module.exports = PersonalSocialHistory;


