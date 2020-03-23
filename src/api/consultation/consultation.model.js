const Sequelize = require('sequelize');

const Consultation = sequelize.define('consultation', {
    consultationId: {type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
    patientId: Sequelize.INTEGER(11),
    chiefComplaintId: Sequelize.INTEGER(11),
    rosId: Sequelize.INTEGER(11),
    physxId: Sequelize.INTEGER(11),
    diagnosisId: Sequelize.INTEGER(11)
});


module.exports = Consultation;
