const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./services/sequelize');

app.use('/patient-juan', require('./routes/main'));
app.use('/patient-juan/test', require('./routes/test'));
app.use('/patient-juan/patients', require('./routes/patient'));
app.use('/patient-juan/patients/complaints', require('./routes/chief-complaint'));
app.use('/patient-juan/users', require('./routes/user'));
app.use('/patient-juan/invitations', require('./routes/invitation'));

require('./services/auth/passport');

module.exports = app;