const Sequelize = require('sequelize');

const DiagnosticTest = sequelize.define('diagnosticTest', {
  test: Sequelize.STRING,
  instructions: Sequelize.TEXT
});

module.exports = DiagnosticTest;