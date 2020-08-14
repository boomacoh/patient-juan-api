const Datatypes = require('sequelize');

const Discount = sequelize.define('discount', {
  name: { type: Datatypes.STRING, allowNull: false },
  value: { type: Datatypes.FLOAT, allowNull: false },
  type: { type: Datatypes.STRING, allowNull: false }
});

module.exports = Discount;