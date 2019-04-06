'use strict';

module.exports = {
  port: process.env.PORT || 3977,
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/hoteldb',
  url: process.env.API_URL || 'http://localhost:',
  secret: process.env.secret || '%/(&SADAhjkjkdsg'
};
