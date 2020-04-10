const Sequelize = require('sequelize');
const ChiefComplaint = require('../chief-complaint/chief-complaint.model');
const Hpi = require('../history-of-present-illness/hpi.model');

const Consultation = sequelize.define('consultation', {
    consultationId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    patientId: Sequelize.INTEGER(11),
    rosId: Sequelize.INTEGER(11),
    physxId: Sequelize.INTEGER(11),
    diagnosisId: Sequelize.INTEGER(11),
    queueId: { type: Sequelize.STRING }
}, {
    defaultScope: {
        include: [{ all: true }]
    }
});

Consultation.hasOne(ChiefComplaint, { foreignKey: 'consultationId' });
ChiefComplaint.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasMany(Hpi, { foreignKey: 'consultationId' });
Hpi.belongsTo(Consultation, { foreignKey: 'consultationId' });


module.exports = Consultation;
