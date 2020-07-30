const DataTypes = require('sequelize');

const LabsAndImaging = sequelize.define('labsAndImaging', {
  date: DataTypes.STRING,
  test: { type: DataTypes.STRING, allowNull: false },
  remarks: DataTypes.TEXT
});

module.exports = LabsAndImaging;