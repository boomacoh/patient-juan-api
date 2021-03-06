require('dotenv').config();
// dotenv.config({ path: '.env' });

getEnvEntry = (entry) => {
  if (!process.env[entry]) {
    console.log(`VALUE at ${entry} is not set!`);
  }
  return process.env[entry];
}

getEnvBoolean = (entry) => {
  if (!process.env[entry]) {
    console.log(`VALUE at ${entry} is not set!`)
  }
  if (process.env[entry].toLowerCase() === 'true') {
    return true;
  } else {
    return false;
  }

}

const config = {
  dbHost: getEnvEntry('DB_HOST'),
  dbName: getEnvEntry('DB_NAME'),
  dbUser: getEnvEntry('DB_USER'),
  dbPassword: getEnvEntry('DB_PASSWORD'),
  dialect: getEnvEntry('DB_DIALECT'),
  jwtSecret: getEnvEntry('JWT_SECRET'),
  emailerAccount: getEnvEntry('EMAILER_ACCOUNT'),
  apiUrl: getEnvEntry('API_URL'),
  clientUrl: getEnvEntry('CLIENT_URL'),
  sendEmail: getEnvBoolean('SEND_EMAIL'),
}

module.exports = config;