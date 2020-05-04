const Sequelize = require('sequelize');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const Institution = require('../institution/institution.model');
const { Ros_CardioVascularSystem, Ros_GastroIntestinalSystem, Ros_GeneralHealth, Ros_Heent, Ros_NervousSystem, Ros_RespiratorySystem } = require('../review-of-systems/review-of-systems.models');
const PhysicalExam = require('../physical-exam/physical-exam.model');
const Plan = require('../plan/plan.model');

const Consultation = sequelize.define('consultation', {
    consultationId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
    chiefComplaint: { type: Sequelize.STRING, allownNull: false },
    diagnosis: { type: Sequelize.STRING(1000) },
    queueId: { type: Sequelize.STRING }
}, {
    defaultScope: {
        include: [{ all: true, attributes: { exclude: ['createdAt', 'updatedAt', 'consultationId'] } }]
    }
});

Consultation.hasMany(Hpi, { as: 'hpis', foreignKey: 'consultationId' });
Hpi.belongsTo(Consultation, { foreignKey: 'consultationId' });

Consultation.belongsTo(Patient, { as: 'patient', foreignKey: 'patientId' });
Patient.hasMany(Consultation, { foreignKey: 'patientId' });

Consultation.belongsTo(User, { as: 'physician', foreignKey: 'physicianId' });
User.hasMany(Consultation, { as: 'consultation', foreignKey: 'physicianId' });

Consultation.belongsTo(Institution, { as: 'institution', foreignKey: 'institutionId' });
Institution.hasMany(Consultation, { foreignKey: 'institutionId' });

Consultation.hasOne(Ros_GeneralHealth, { as: 'rosGeneralHealth', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_Heent, { as: 'rosHeent', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_GastroIntestinalSystem, { as: 'rosGastroIntestinalSystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_RespiratorySystem, { as: 'rosRespiratorySystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_CardioVascularSystem, { as: 'rosCardiovascularSystem', foreignKey: 'consultationId' });
Consultation.hasOne(Ros_NervousSystem, { as: 'rosNervousSystem', foreignKey: 'consultationId' });

Consultation.hasOne(PhysicalExam, { as: 'physicalExam', foreignKey: 'consultationId' });
Consultation.hasOne(Plan, { as: 'plan', foreignKey: 'consultationId' });

module.exports = Consultation;
