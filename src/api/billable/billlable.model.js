const Sequelize = require('sequelize');
const Institution = require('../institution/institution.model');

const Billable = sequelize.define('billable', {
  name: { type: Sequelize.STRING, allowNull: false },
  category: { type: Sequelize.STRING, allowNull: false },
  uom: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false }
});


module.exports = Billable;