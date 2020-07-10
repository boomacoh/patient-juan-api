const DataTypes = require('sequelize');

const Diagnostic = sequelize.define('diagnostic', {
  date: DataTypes.STRING,
  test: { type: DataTypes.STRING, allowNull: false },
  remarks: DataTypes.TEXT
});

module.exports = Diagnostic;