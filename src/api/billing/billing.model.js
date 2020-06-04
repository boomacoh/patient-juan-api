const Datatypes = require('sequelize');
const BillingItem = require('./billing-items.model');
const Patient = require('../patient/patient.model');
const Clinic = require('../institution/institution.model');

const Billing = sequelize.define('billing', {
  id: { type: Datatypes.UUID, defaultValue: Datatypes.UUIDV1, primaryKey: true },
  status: { type: Datatypes.STRING, allowNull: false, defaultValue: 'unpaid' }
}, {
  defaultScope: {
    include: ['billingItems', 'patient', 'clinic']
  }
});

Billing.hasMany(BillingItem, { as: 'billingItems' });
Billing.belongsTo(Patient, { as: 'patient' })
Billing.belongsTo(Clinic, { as: 'clinic' });

module.exports = Billing;