const Sequelize = require('sequelize');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const Institution = require('../institution/institution.model');
const { Ros_CardioVascularSystem, Ros_GastroIntestinalSystem, Ros_GeneralHealth, Ros_Heent, Ros_NervousSystem, Ros_RespiratorySystem } = require('../review-of-systems/review-of-systems.models');
const PhysicalExam = require('../physical-exam/physical-exam.model');
const Plan = require('../plan/plan.model');
const Billing = require('../billing/billing.model');

const Consultation = sequelize.define('consultation', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
    chiefComplaint: { type: Sequelize.STRING, allownNull: false },
    diagnosis: { type: Sequelize.STRING(1000) },
    queueId: { type: Sequelize.UUID }
}, {
    defaultScope: {
        include: [{ all: true, attributes: { exclude: ['createdAt', 'updatedAt', 'consultationId'] } }]
    },
    scopes: {
        history: {
            attributes: [
                'id',
                'createdAt',
                'updatedAt',
                'chiefComplaint',
                [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
                [Sequelize.fn('MONTHNAME', Sequelize.col('createdAt')), 'month'],
                [Sequelize.fn('DAY', Sequelize.col('createdAt')), 'day']
            ]
        }
    }
});

Consultation.hasMany(Hpi, { as: 'hpis' });
Hpi.belongsTo(Consultation);

Consultation.belongsTo(Patient, { as: 'patient' });
Patient.hasMany(Consultation);

Consultation.belongsTo(User, { as: 'physician', foreignKey: 'physicianId' });
User.hasMany(Consultation, { as: 'consultations', foreignKey: 'physicianId' });

Consultation.belongsTo(Institution);
Institution.hasMany(Consultation);

Consultation.hasOne(Ros_GeneralHealth, { as: 'rosGeneralHealth' });
Consultation.hasOne(Ros_Heent, { as: 'rosHeent' });
Consultation.hasOne(Ros_GastroIntestinalSystem, { as: 'rosGastroIntestinalSystem' });
Consultation.hasOne(Ros_RespiratorySystem, { as: 'rosRespiratorySystem' });
Consultation.hasOne(Ros_CardioVascularSystem, { as: 'rosCardiovascularSystem' });
Consultation.hasOne(Ros_NervousSystem, { as: 'rosNervousSystem' });

Consultation.hasOne(PhysicalExam, { as: 'physicalExam' });
Consultation.hasOne(Plan, { as: 'plan' });

Consultation.hasOne(Billing, { onDelete: 'CASCADE' });

module.exports = Consultation;
