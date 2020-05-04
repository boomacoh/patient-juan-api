const Sequelize = require('sequelize');

const Plan = sequelize.define('plan', {
  diet: Sequelize.STRING,
  disposition: Sequelize.STRING
});

module.exports = Plan;