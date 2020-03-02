require('dotenv').config({path: './.env'});
const Sequelize = require('sequelize');
const Patient = require('./src/models/patient.model');

const john = Patient.findAll({firstName: 'Juan'});

console.log(john);