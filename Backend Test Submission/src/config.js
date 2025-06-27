require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  APP_HOST: process.env.APP_HOST,      // e.g. http://localhost:3000
  LOG_API: process.env.LOG_API,        // logging server URL
  ACCESS_TOKEN: process.env.ACCESS_TOKEN
};
