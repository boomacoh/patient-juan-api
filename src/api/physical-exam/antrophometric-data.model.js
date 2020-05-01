const Sequelize = require('sequelize');

const AntrophometricData = sequelize.define('antrophometricData', {
  height: Sequelize.INTEGER,
  weight: Sequelize.INTEGER,
  remarks: Sequelize.STRING
}, {
  freezeTableName: true
});

module.exports = AntrophometricData;