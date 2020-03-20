const Sequelize = require('sequelize');
const Patient = require('../models/patient.model');

const ChiefComplaint = sequelize.define('chief_complaint', {
    complaintId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    complaint: { type: Sequelize.STRING(255), allowNull: false }
}, {
    timestamps: true,
});

ChiefComplaint.belongsTo(Patient, {foreignKey: 'patientId'});

//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = ChiefComplaint;
