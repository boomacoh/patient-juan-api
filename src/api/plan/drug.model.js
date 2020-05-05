const Sequelize = require('sequelize');

const Drug = sequelize.define('drug', {
  generic: Sequelize.STRING,
  brand: Sequelize.STRING,
  prepration: Sequelize.STRING,
  frequency: Sequelize.STRING,
  route: Sequelize.STRING,
  purpose: Sequelize.STRING
});

module.exports = Drug;