const Sequelize = require('sequelize');
const ChiefComplaint = require('../chief-complaint/chief-complaint.model');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const { Ros_CardioVascularSystem, Ros_GastroIntestinalSystem, Ros_GeneralHealth, Ros_Heent, Ros_NervousSystem, Ros_RespiratorySystem } = require('../review-of-systems/review-of-systems.models');

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

Consultation.hasOne(Ros_GeneralHealth, { as: 'rosGeneralHealth', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_Heent, { as: 'rosHeent', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_GastroIntestinalSystem, { as: 'rosGastroIntestinalSystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_RespiratorySystem, { as: 'rosRespiratorySystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_CardioVascularSystem, { as: 'rosCardiovascularSystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_NervousSystem, { as: 'rosNervousSystem', foreignKey: 'consultationId' });

module.exports = Consultation;
