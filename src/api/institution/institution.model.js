const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const UserInstitution = require('../user-institution/user-institution.model');
const Billable = require('../billable/billlable.model');
const Package = require('../billable/package.model');
const Invitation = require('../invitation/invitation.model');
const Patient = require('../patient/patient.model');


const Institution = sequelize.define('institution', {
  tradeName: Sequelize.STRING,
  registeredName: { type: Sequelize.STRING, allowNull: false },
  businessStructure: Sequelize.STRING,
  tinNo: Sequelize.STRING,
  mailingAddress: Sequelize.STRING,
  contactNo: Sequelize.STRING
}, {
  setterMethods: {
    registeredName(value) {
      this.setDataValue('registeredName', value.charAt(0).toUpperCase() + value.slice(1));
    },
    contactNo(value) {
      if (value) return this.setDataValue('contactNo', value.join(';'));
      this.setDataValue('contactNo', null);
    }
  },
  getterMethods: {
    contactNo() {
      contactNos = this.getDataValue('contactNo');
      if (contactNos) return contactNos.split(';');
    }
  }
});

Institution.belongsToMany(User, { through: UserInstitution });
User.belongsToMany(Institution, { through: UserInstitution });
Institution.hasMany(Billable);
Institution.hasMany(Package);
Institution.hasMany(Invitation);
Patient.belongsTo(Institution, { allowNull: false });
Institution.hasMany(Patient, { allowNull: false });

module.exports = Institution;