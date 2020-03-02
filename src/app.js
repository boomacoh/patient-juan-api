const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./services/sequelize');

app.use('/patient-juan', require('./routes/main'));
app.use('/patient-juan/test', require('./routes/test'));
app.use('/patient-juan/patients', require('./routes/patient'));


module.exports = app;