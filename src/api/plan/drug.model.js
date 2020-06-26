const Sequelize = require('sequelize');

const Drug = sequelize.define('drug', {
  generic: { type: Sequelize.STRING, allowNull: false },
  qty: { type: Sequelize.INTEGER, allowNull: false },
  preparation: { type: Sequelize.STRING, allowNull: false },
  brand: Sequelize.STRING,
  instructions: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Drug;