const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const UserInstitution = require('../user-institution/user-institution.model');

const Institution = sequelize.define('institution', {
  institutionId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
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

Institution.belongsToMany(User, { through: UserInstitution, sourceKey: 'institutionId', foreignKey: 'institutionId' });
User.belongsToMany(Institution, { through: UserInstitution, sourceKey: 'userId', foreignKey: 'userId' });

module.exports = Institution;