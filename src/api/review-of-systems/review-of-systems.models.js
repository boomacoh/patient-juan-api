const Sequelize = require('sequelize');

const Ros_GeneralHealth = sequelize.define('ros_generalHealth', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

const Ros_Heent = sequelize.define('ros_heent', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

const Ros_CardioVascularSystem = sequelize.define('ros_cardiovascularSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

const Ros_RespiratorySystem = sequelize.define('ros_respiratorySystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

const Ros_GastroIntestinalSystem = sequelize.define('ros_gastroIntestinalSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

const Ros_NervousSystem = sequelize.define('ros_nervousSystem', {
  symptoms: Sequelize.STRING(1000),
  remarks: Sequelize.STRING(1000),
  notes: Sequelize.STRING
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
      if (symptoms) return symptoms.split(';');
      return [];
    },
    remarks() {
      const remarks = this.getDataValue('remarks');
      if (remarks) return remarks.split(';');
      return [];
    }
  }
});

module.exports = { Ros_GeneralHealth, Ros_Heent, Ros_CardioVascularSystem, Ros_RespiratorySystem, Ros_GastroIntestinalSystem, Ros_NervousSystem };