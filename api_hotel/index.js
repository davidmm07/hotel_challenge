'use strict';

const mongoose = require('mongoose');
const db = require('./config/keys');
const app = require('./app');
const port = db.port;
mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI, { useNewUrlParser: true }, (err, res) => {
  if (err) {
    throw err;
  } else {
    console.log('Conection Status OK 200');

    app.listen(port, function() {
      console.log('hotel-api rest server listening in port :' + port);
    });
  }
});
