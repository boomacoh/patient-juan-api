const Sequelize = require('sequelize');

const Hpi = sequelize.define('hpi', {
  hpiId: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  timeFrame: { type: Sequelize.STRING },
  details: { type: Sequelize.STRING }
}, {
  timeStamps: false
});

module.exports = Hpi;