const Sequelize = require('sequelize');
const Patient = require('../patient/patient.model');

const ChiefComplaint = sequelize.define('chief_complaint', {
    chiefComplaintId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    chiefComplaint: { type: Sequelize.STRING(255), allowNull: false }
});

//hasOne -> targetModel
//belongsTo -> sourceModel

module.exports = ChiefComplaint;
