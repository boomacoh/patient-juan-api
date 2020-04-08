const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Patient = require('../patient/patient.model');

const Queue = sequelize.define('queue', {
  type: { type: Sequelize.STRING, allowNull: false, validate: { isIn: { args: [['appointment', 'walk-in']], msg: 'That is not a valid type' } } },
  date: { type: Sequelize.DATEONLY, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
  reason: { type: Sequelize.STRING, allowNull: false },
  doctorId: { type: Sequelize.INTEGER(11), },
  institutionId: { type: Sequelize.INTEGER(11) },
}, {
  scopes: {
    type: (type) => { return { where: { type: type } } },
    status: (status) => { return { where: { status: status } } },
    patient: {
      include: [{ model: Patient, attributes: ['firstName', 'lastName'], required: true }]
    }
  }
});

Queue.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Queue, { foreignKey: 'patientId' })


module.exports = Queue;