const Sequelize = require('sequelize');

const GeneralHealthSystem = sequelize.define('genHealthSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});

const HeentSystem = sequelize.define('heentSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});

const CardioVascularSystem = sequelize.define('cardiovascularSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});

const RespiratorySystem = sequelize.define('respiratorySystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});

const GastroIntestinalSystem = sequelize.define('gastroIntestinalSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});

const NervousSystem = sequelize.define('nervousSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
}, {
  freezeTableName: true,
  setterMethods: {
    symptoms(value) {
      if (value) return this.setDataValue('symptoms', value.join('-'));
      this.setDataValue('symptoms', null);
    },
    remarks(value) {
      if (value) return this.setDataValue('remarks', value.join('-'));
      this.setDataValue('remarks', null);
    }
  },
  getterMethods: {
    symptoms() {
      const symptoms = this.getDataValue('symptoms').split('-');
      if (symptoms) return symptoms;
      return null;
    },
    remarks() {
      const remarks = this.getDataValue('remarks').split('-');
      if (remarks) return remarks;
      return null;
    }
  }
});


module.exports = { GeneralHealthSystem, HeentSystem, CardioVascularSystem, RespiratorySystem, GastroIntestinalSystem, NervousSystem };