const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Patient = require('../patient/patient.model');
const User = require('../user/user/user.model');
const Institution = require('../institution/institution.model');

const Queue = sequelize.define('queue', {
  id: { type: Sequelize.UUID, allowNull: false, defaultValue: Sequelize.UUIDV1, primaryKey: true },
  date: { type: Sequelize.DATEONLY, allowNull: false },
  queueNumber: { type: Sequelize.INTEGER, allowNull: false },
  type: { type: Sequelize.STRING, allowNull: false, validate: { isIn: { args: [['appointment', 'walk-in']], msg: 'That is not a valid type' } } },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
  reason: { type: Sequelize.STRING, allowNull: false },
  institutionId: { type: Sequelize.UUID, references: { model: Institution, key: 'id' } },
  physicianId: { type: Sequelize.UUID, references: { model: User, key: 'id' } }
}, {
  scopes: {
    type: (type) => { return { where: { type: type } } },
    status: (status) => { return { where: { status: status } } },
    physician: (physicianId) => { return { where: { physicianId: physicianId } } },
    institution: (institutionId) => { return { where: { institutionId: institutionId } } },
    current: { where: { date: new Date() }, order: [['queueNumber', 'ASC']] },
    patient: { include: [{ model: Patient, attributes: ['firstName', 'lastName'], required: true }] }
  }
});

Queue.belongsTo(Patient);
Patient.hasMany(Queue);

module.exports = Queue;