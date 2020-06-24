const Sequelize = require('sequelize');

const Diagnostic = sequelize.define('diagnostic', {
  test: Sequelize.STRING,
  instructions: Sequelize.STRING
});

module.exports = Diagnostic;