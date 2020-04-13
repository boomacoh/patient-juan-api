const Sequelize = require('sequelize');
const ChiefComplaint = require('../chief-complaint/chief-complaint.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');

const Consultation = sequelize.define('consultation', {
    consultationId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    queueId: { type: Sequelize.STRING }
}, {
    defaultScope: {
        include: [{ all: true, attributes: { exclude: ['createdAt', 'updatedAt', 'consultationId'] } }]
    }
});

Consultation.hasOne(ChiefComplaint, { foreignKey: 'consultationId' });
ChiefComplaint.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasMany(Hpi, { foreignKey: 'consultationId' });
Hpi.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Consultation, { foreignKey: 'patientId' });
Consultation.belongsTo(User, { as: 'doctor', foreignKey: 'userId' });
User.hasMany(Consultation, { as: 'doctor', foreignKey: 'userId' });


module.exports = Consultation;
