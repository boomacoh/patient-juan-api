const Sequelize = require('sequelize');

const Rosystem = sequelize.define('rosystem', {
  unremarkable: { type: Sequelize.BOOLEAN, defaultValue: false },
  symptoms: Sequelize.TEXT,
  remarks: Sequelize.TEXT,
  notes: Sequelize.TEXT,
  group: { type: Sequelize.STRING, allowNull: false }
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join(';'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join(';'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms');
      if (symptoms) return symptoms.split(';')
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

module.exports = Rosystem;