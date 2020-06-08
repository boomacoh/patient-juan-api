const Sequelize = require('sequelize');

const Billable = sequelize.define('billable', {
  name: { type: Sequelize.STRING, allowNull: false, unique: { args: true, msg: 'Item with that name already exists' } },
  category: { type: Sequelize.STRING, allowNull: false },
  uom: { type: Sequelize.STRING, allowNull: false },
  price: { type: Sequelize.FLOAT, allowNull: false }
});

module.exports = Billable;