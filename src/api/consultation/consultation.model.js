const Sequelize = require('sequelize');
const Hpi = require('../history-of-present-illness/hpi.model');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const Institution = require('../institution/institution.model');
const Rosystem = require('../review-of-systems/review-of-systems.model');
const PhysicalExam = require('../physical-exam/physical-exam.model');
const Plan = require('../plan/plan.model');
const Billing = require('../billing/billing.model');
const LabsAndImaging = require('../labs-and-imaging/labs-and-imaging.model');
const moment = require('moment');

const Consultation = sequelize.define('consultation', {
    id: { type: Sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: Sequelize.UUIDV1 },
    chiefComplaint: { type: Sequelize.STRING, allownNull: false },
    diagnosis: Sequelize.STRING(1000),
    queueId: Sequelize.UUID,
    status: { type: Sequelize.STRING, defaultValue: 'active' }
}, {
    scopes: {
        all: {
            include: [{ all: true }]
        },
        history: {
            attributes: [
                'id',
                'createdAt',
                'updatedAt',
                'chiefComplaint',
                'diagnosis',
                [Sequelize.fn('YEAR', Sequelize.col('createdAt')), 'year'],
                [Sequelize.fn('MONTHNAME', Sequelize.col('createdAt')), 'month'],
                [Sequelize.fn('DAY', Sequelize.col('createdAt')), 'day']
            ],
        },
        physician: (physicianId) => { return { where: { physicianId: physicianId } } },
        patient: (patientId) => { return { where: { patientId: patientId } } }
    },
    hooks: {
        afterCreate: (consultation, options) => {
            consultation.createPlan();
            consultation.createPhysicalExam();
        }
    }
});

Consultation.belongsTo(Patient, { as: 'patient' });
Patient.hasMany(Consultation);
Consultation.belongsTo(User, { as: 'physician', foreignKey: 'physicianId' });
User.hasMany(Consultation, { as: 'consultations', foreignKey: 'physicianId' });
Consultation.belongsTo(Institution);
Institution.hasMany(Consultation);

Consultation.hasOne(PhysicalExam, { as: 'physicalExam', foreignKey: 'consultationId', onDelete: 'CASCADE' });
Consultation.hasOne(Plan, { as: 'plan', foreignKey: 'consultationId', onDelete: 'CASCADE' });
Consultation.hasOne(Billing, { onDelete: 'CASCADE' });

Consultation.hasMany(Hpi, { as: 'hpis' });
Hpi.belongsTo(Consultation);
Consultation.hasMany(Rosystem, { as: 'rosystems', foreignKey: 'consultationId', onDelete: 'CASCADE' });
Consultation.hasMany(LabsAndImaging, { as: 'labsAndImagings', foreignKey: 'consultationId', onDelete: 'CASCADE' })
module.exports = Consultation;
