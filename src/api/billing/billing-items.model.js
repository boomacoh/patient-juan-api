const Datatypes = require('sequelize');

const BillingItem = sequelize.define('billing_items', {
  name: { type: Datatypes.STRING, allowNull: false },
  price: { type: Datatypes.FLOAT, allowNull: false },
  tag: { type: Datatypes.STRING, allowNull: false },
  qty: { type: Datatypes.INTEGER, allowNull: false },
  discount: Datatypes.STRING,
  discountType: Datatypes.STRING,
  discountValue: { type: Datatypes.FLOAT, defaultValue: 0 },
  hmo: { type: Datatypes.STRING },
  hmoValue: { type: Datatypes.FLOAT, defaultValue: 0 },
  total: Datatypes.VIRTUAL(Datatypes.FLOAT)
}, {
  setterMethods: {
    items(value) {
      if (value) return this.setDataValue('items', value.join(';'));
      this.setDataValue('items', null);
    }
  },
  getterMethods: {
    total() {
      const discount = this.getDataValue('discount');
      const totalValue = this.price * this.qty;
      if (discount) {
        if (this.discountType === 'amt') return totalValue - (this.discountValue + hmoValue);
        if (this.discountType === 'percent') return totalValue - (totalValue * (this.discountValue / 100));
      }
      return totalValue;
    },
    items() {
      const items = this.getDataValue('items');
      if (items) return items.split(';');
      return [];
    }
  }
});

module.exports = BillingItem;