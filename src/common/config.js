const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  DEFAULT_LANG: 'en',
  DEV_PORT: process.env.PORT || 5000,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET: `${process.env.JWT_SECRET}`
};
