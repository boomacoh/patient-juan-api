const Sequelize = require('sequelize');
const ChiefComplaint = require('../chief-complaint/chief-complaint.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const { RespiratorySystem, NervousSystem, HeentSystem, GeneralHealthSystem, GastroIntestinalSystem, CardioVascularSystem } = require('../review-of-systems/review-of-systems.models');

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

Consultation.belongsTo(User, { as: 'physician', foreignKey: 'physicianId' });
User.hasMany(Consultation, { as: 'physician', foreignKey: 'physicianId' });

Consultation.hasOne(RespiratorySystem, { foreignKey: 'consultationId' });
RespiratorySystem.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasOne(NervousSystem, { foreignKey: 'consultationId' });
NervousSystem.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasOne(HeentSystem, { foreignKey: 'consultationId' });
HeentSystem.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasOne(GeneralHealthSystem, { foreignKey: 'consultationId' });
GeneralHealthSystem.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasOne(GastroIntestinalSystem, { foreignKey: 'consultationId' });
GastroIntestinalSystem.belongsTo(Consultation, { foreignKey: 'consultationId' });
Consultation.hasOne(CardioVascularSystem, { foreignKey: 'consultationId' });
CardioVascularSystem.belongsTo(Consultation, { foreignKey: 'consultationId' });


module.exports = Consultation;
