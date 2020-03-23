const Sequelize = require('sequelize');
const User = require('../user/user/user.model');
const UserInstitution = require('../user-institution/user-institution.model');

const Institution = sequelize.define('institution', {
  institutionId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
  tradeName: Sequelize.STRING,
  registeredName: { type: Sequelize.STRING, allowNull: false, unique: {args: true, msg: 'Trade name taken'} },
  businessStructure: Sequelize.STRING,
  tinNo: Sequelize.STRING,
  mailingAddress: Sequelize.STRING,
  contactNo: {
    type: Sequelize.STRING,
    set(value) {
      this.setDataValue('contactNo', value.join(','));
    },
    get() {
      return (this.getDataValue('contactNo') ? this.getDataValue('contactNo').split(','): []);
    }
  }
});

Institution.belongsToMany(User, { through: UserInstitution, sourceKey: 'institutionId', foreignKey: 'institutionId'});
User.belongsToMany(Institution, { through: UserInstitution, sourceKey: 'userId', foreignKey: 'userId'});

module.exports = Institution;