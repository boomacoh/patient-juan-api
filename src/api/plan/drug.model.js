const Sequelize = require('sequelize');

const Drug = sequelize.define('drug', {
  generic: { type: Sequelize.STRING, allowNull: false },
  preparation: Sequelize.STRING,
  brand: Sequelize.STRING,
  instructions: Sequelize.STRING,
});

module.exports = Drug;