const Sequelize = require('sequelize');
const UserInstitution = require('./user-institution.model');

const Specialization = sequelize.define('specialization', {
  code: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true },
  description: Sequelize.STRING
});

Specialization.belongsToMany(UserInstitution, { through: 'assignment-line', sourceKey: 'code', foreignKey: 'code' });
UserInstitution.belongsToMany(Specialization, { through: 'assignment-line', sourceKey: 'userInstitutionId', foreignKey: 'userInstitutionId' });

module.exports = Specialization;