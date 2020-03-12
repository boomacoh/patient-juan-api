const Sequelize = require('sequelize');
const UserInstitution = require('./user-institution.model');

const Specialization = sequelize.define('specialization', {
  specializationId: { type: Sequelize.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true },
  description: Sequelize.STRING
});

Specialization.belongsToMany(UserInstitution, { through: 'assignment-line', sourceKey: 'specializationId', foreignKey: 'specializationIds' });
UserInstitution.belongsToMany(Specialization, { through: 'assignment-line', sourceKey: 'userInstitutionId', foreignKey: 'userInstitutionId' });

module.exports = Specialization;