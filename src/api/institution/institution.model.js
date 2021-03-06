const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const UserInstitution = require('../user-institution/user-institution.model');
const Invitation = require('../invitation/invitation.model');


const Institution = sequelize.define('institution', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV1, unique: true },
  tradeName: Sequelize.STRING,
  registeredName: { type: Sequelize.STRING, allowNull: false },
  businessStructure: Sequelize.STRING,
  tinNo: Sequelize.STRING,
  mailingAddress: Sequelize.STRING,
  contactNo: Sequelize.STRING,
  image: Sequelize.STRING
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
User.hasMany(Institution, { as: 'ownedInstitutions', foreignKey: 'ownerId' });
Institution.belongsTo(User, { as: 'owner', allowNull: false, foreignKey: 'ownerId' });
Institution.hasMany(Invitation);

module.exports = Institution;