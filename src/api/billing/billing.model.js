const Datatypes = require('sequelize');
const BillingItem = require('./billing-items.model');
const Patient = require('../patient/patient.model');
const Institution = require('../institution/institution.model');
const User = require('../user/user/user.model');
const Profile = require('../profile/profile.model');

const Billing = sequelize.define('billing', {
  id: { type: Datatypes.UUID, defaultValue: Datatypes.UUIDV1, primaryKey: true },
  status: { type: Datatypes.STRING, allowNull: false, defaultValue: 'unpaid' },
  total: Datatypes.VIRTUAL(Datatypes.FLOAT)
}, {
  scopes: {
    details: {
      include: [
        { model: User, as: 'physician', attributes: ['email'], include: [{ model: Profile, attributes: ['firstName', 'lastName', 'fullName', 'title'] }] },
        { model: Patient, as: 'patient', attributes: ['fullName', 'firstName', 'lastName', 'mailingAddress'] },
        { model: Institution, as: 'institution', attributes: ['registeredName', 'mailingAddress', 'image'] }
      ]
    },
    billingItems: { include: 'billingItems' },
    status: (status) => { return { where: { status: status } } },
    institution: (id) => { return { where: { institutionId: id } } },
    physician: (id) => { return { where: { physicianId: id } } }
  },
  getterMethods: {
    total() {
      let totalValue = 0;
      if (this.billingItems) {
        this.billingItems.forEach(item => totalValue += item.total);
      }
      return totalValue
    }
  }
});

Billing.hasMany(BillingItem, { as: 'billingItems', onDelete: 'CASCADE' });
Billing.belongsTo(Patient, { as: 'patient' })
Billing.belongsTo(Institution, { as: 'institution' });
Billing.belongsTo(User, { as: 'physician', foreignKey: 'physicianId' })


module.exports = Billing;