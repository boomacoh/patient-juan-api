const app = require('./app');
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.set('port', port);

server.listen(port);
server.on('error', () => console.log('Server error'))
server.on('listening', () => console.log('App listening on port', port));
