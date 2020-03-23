const Sequelize = require('sequelize');

const Test = sequelize.define('test', {
    testId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    testBody: Sequelize.TEXT,
    testTitle: Sequelize.STRING(255)
}, {
  classMethods: {
    sayHey: function() {
        console.log(this.testBody);
    }
  }
});



module.exports = Test;

