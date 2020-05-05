const Sequelize = require('sequelize');

const Diagnostic = sequelize.define('diagnostic', {
  diagnostic: Sequelize.STRING,
  details: Sequelize.STRING
});

module.exports = Diagnostic;