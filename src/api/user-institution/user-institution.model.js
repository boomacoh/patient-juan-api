const Sequelize = require('sequelize');

const UserInstitution = sequelize.define('user_institution', {
  assignmentId: { type: Sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  userId: { type: Sequelize.UUID, allowNull: false },
  institutionId: { type: Sequelize.UUID, allowNull: false },
  isDefault: { type: Sequelize.BOOLEAN, defaultValue: false, allowNull: false },
  access: { type: Sequelize.STRING(255), allowNull: false }
}, {
  freezeTableName: true,
  setterMethods: {
    access(value) { this.setDataValue('access', value.join(';')); }
  },
  getterMethods: {
    access() { return this.getDataValue('access').split(';'); }
  }
});


module.exports = UserInstitution;