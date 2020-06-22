const Sequelize = require('sequelize');

const AnthropometricData = sequelize.define('anthropometricData', {
  height: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  remarks: Sequelize.STRING
}, {
  freezeTableName: true
});

module.exports = AnthropometricData;