const Sequelize = require('sequelize');

const UserInstitution = sequelize.define('user-institution', {
  assignmentId: { type: Sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
  userId: { type: Sequelize.INTEGER(11), allowNull: false },
  institutionId: { type: Sequelize.INTEGER(11), allowNull: false },
  access: {
    type: Sequelize.STRING(255),
    allowNull: false,
    set(value) {
      this.setDataValue('access', value.join(';'));
    },
    get() {
      return this.getDataValue('access').split(';');
    }
  }
}, {
  freezeTableName: true
});


module.exports = UserInstitution;