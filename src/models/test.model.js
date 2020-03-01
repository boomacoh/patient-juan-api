const Sequelize = require('sequelize');

const Test = sequelize.define('test', {
  testId: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});


module.exports = Test;

