const Sequelize = require('sequelize');

const Allergy = sequelize.define('allergy', {
  trigger: Sequelize.STRING,
  remarks: Sequelize.STRING
});

const PastIllness = sequelize.define('pastIllness', {
  illness: Sequelize.STRING(500),
  remarks: Sequelize.STRING(500),
  parent: Sequelize.STRING
}, {
  scopes: {
    parent(parent) { return { where: { parent: parent } } }
  },
  setterMethods: {
    illness(value) {
      if (value) return this.setDataValue('illness', value.join('-'));
      this.setDataValue('illness', null)
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    illness() {
      const illnesses = this.getDataValue('illness').split('-');
      if (illnesses) return illnesses;
      return [];
    },
    remarks(){
      const remarks = this.getDataValue('remarks').split('-');
      if(remarks) return remarks;
      return [];
    }
  }
});

const Surgery = sequelize.define('surgery', {
  approximateDate: Sequelize.DATEONLY,
  type: Sequelize.STRING,
  reason: Sequelize.STRING,
  complications: Sequelize.STRING
});

const Medication = sequelize.define('medication', {
  generic: Sequelize.STRING,
  brand: Sequelize.STRING,
  preparation: Sequelize.STRING,
  frequency: Sequelize.STRING,
  route: Sequelize.STRING,
  purpose: Sequelize.STRING
});

const Substance = sequelize.define('substance', {
  substance: Sequelize.STRING,
  remarks: Sequelize.STRING
});

// Illness.removeAttribute('id');
// Allergy.removeAttribute('id');
// Surgery.removeAttribute('id');
// Medication.removeAttribute('id');
// Substance.removeAttribute('id');

module.exports = { Allergy, Medication, Surgery, PastIllness, Substance }