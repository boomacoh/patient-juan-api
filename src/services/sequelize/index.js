const Sequelize = require('sequelize');
const config = require('../../config');

Sequelize.Promise = global.Promise;

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
  host: config.dbHost,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.sync({ force: true, alter: true })
  .then(() => console.log('Database re-synced!'))
  .catch(err => console.log('Database sync error: ', err));

global.sequelize = sequelize;
module.exports = sequelize;
