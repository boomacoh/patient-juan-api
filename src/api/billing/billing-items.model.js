const Datatypes = require('sequelize');

const BillingItems = sequelize.define('billing_items', {
  name: { type: Datatypes.STRING, allowNull: false },
  qty: { type: Datatypes.INTEGER, allowNull: false },
  discount: Datatypes.INTEGER,
  discountType: Datatypes.STRING,
  hmo: { type: Datatypes.BOOLEAN, defaultValue: false },
  price: { type: Datatypes.FLOAT, allowNull: false },
  total: { type: Datatypes.VIRTUAL(Datatypes.FLOAT) }
}, {
  getterMethods: {
    total() {
      const discount = this.getDataValue('discount')
      const a = this.price * this.qty;
      if (discount) {
        if (this.discountType === 'amt') return a - this.discount;
        if (this.discountType === 'percent') return a - (a * (this.discount / 100));
      }
      return a;
    }
  }
});

module.exports = BillingItems;