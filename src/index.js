const app = require('./app');
require('dotenv').config();

const port = process.env.PORT || 3000;
app.set('port', port);

// const server = http.createServer(app);
// server.listen(() => console.log('API listening on PORT:', port))

app.listen(port, () => console.log('API listening on PORT', port));
