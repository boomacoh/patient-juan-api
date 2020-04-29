const Sequelize = require('sequelize');

const Hpi = sequelize.define('hpi', {
  timeFrame: { type: Sequelize.STRING },
  details: { type: Sequelize.STRING }
}, {
  timeStamps: false
});

module.exports = Hpi;