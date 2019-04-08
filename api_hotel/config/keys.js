'use strict';
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  url: process.env.API_URL,
  secret: process.env.secret || '%/(&SADAhjkjkdsg'
};
