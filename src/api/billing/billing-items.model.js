const Datatypes = require('sequelize');

const BillingItems = sequelize.define('billing_items', {
  name: { type: Datatypes.STRING, allowNull: false },
  qty: { type: Datatypes.INTEGER, allowNull: false },
  discount: Datatypes.STRING,
  discountType: Datatypes.STRING,
  discountValue: {type: Datatypes.FLOAT, defaultValue: 0},
  hmo: { type: Datatypes.BOOLEAN, defaultValue: false },
  price: { type: Datatypes.FLOAT, allowNull: false },
  total: { type: Datatypes.VIRTUAL(Datatypes.FLOAT) }
}, {
  getterMethods: {
    total() {
      const discount = this.getDataValue('discount');
      const totalValue = this.price * this.qty;
      if (discount) {
        if (this.discountType === 'amt') return totalValue - this.discountValue;
        if (this.discountType === 'percent') return totalValue - (totalValue * (this.discountValue / 100));
      }
      return totalValue;
    }
  }
});

module.exports = BillingItems;