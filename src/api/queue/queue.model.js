const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Patient = require('../patient/patient.model');
const moment = require('moment');

const Queue = sequelize.define('queue', {
  queueId: { type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
  doctorId: { type: Sequelize.INTEGER(11), },
  institutionId: { type: Sequelize.INTEGER(11) },
  date: { type: Sequelize.DATEONLY, allowNull: false },
  queueNumber: Sequelize.INTEGER,
  type: { type: Sequelize.STRING, allowNull: false, validate: { isIn: { args: [['appointment', 'walk-in']], msg: 'That is not a valid type' } } },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
  reason: { type: Sequelize.STRING, allowNull: false },
}, {
  scopes: {
    type: (type) => { return { where: { type: type } } },
    status: (status) => { return { where: { status: status } } },
    doctor: (doctorId) => { return { where: { doctorId: doctorId } } },
    institution: (institutionId) => { return { where: { institutionId: institutionId } } },
    current: { where: { date: new Date() }, order: [['queueNumber', 'ASC']] },
    patient: { include: [{ model: Patient, attributes: ['firstName', 'lastName'], required: true }] }
  }
});

Queue.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Queue, { foreignKey: 'patientId' })


module.exports = Queue;