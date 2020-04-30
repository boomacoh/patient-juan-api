const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const expresshbs = require('express-handlebars');

const app = express();

app.engine('hbs', expresshbs({ extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./services/sequelize');

require('./routes')(app);

require('./services/auth/passport');

// app.use(function (err, req, res, next) {
//   if (err.code === 'permission_denied') res.status(403).send('Forbidden');
// });

module.exports = app;