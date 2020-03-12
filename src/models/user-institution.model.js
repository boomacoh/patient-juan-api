const Sequelize = require('sequelize');

const UserInstitution = sequelize.define('user-institution', {
  userInstitutionId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
  userId: Sequelize.INTEGER(11),
  institutionId: Sequelize.INTEGER(11),
});


module.exports = UserInstitution;