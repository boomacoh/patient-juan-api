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
app.use('/patient-juan/patients/complaints', require('./routes/chief-complaint'));
app.use('/patient-juan/users', require('./routes/user'));

require('./services/auth/passport');


module.exports = app;