require('dotenv').config();
// dotenv.config({ path: '.env' });

getEnvEntry = (entry) => {
  if (!process.env[entry]) {
    console.log(`VALUE at ${entry} is not set!`);
  }
  return process.env[entry];
}

const config = {
  dbHost: getEnvEntry('DB_HOST'),
  dbName: getEnvEntry('DB_NAME'),
  dbUser: getEnvEntry('DB_USER'),
  dbPassword: getEnvEntry('DB_PASSWORD'),
  dialect: getEnvEntry('DB_DIALECT')
}

module.exports = config;