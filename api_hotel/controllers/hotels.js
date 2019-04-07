'use strict';

let Hotels = require('../models/hotels');

function getHotels(req, res) {
  let hotelName = req.query.name;
  let query = req.query;
  let find = Hotels;
  if (!hotelName) {
    find = find.find({}).sort('name');
  } else {
    find = find.find({ name: new RegExp('^.*' + hotelName + '.*$', 'i') }).sort('name');
  }
  if (query) {
    let limit = parseInt(req.query.limit, 10) || 10,
      skip = parseInt(req.query.skip, 10) || 0,
      query = req.query || {};

    delete query.skip;
    delete query.limit;
    delete query.name;
    find = find
      .find(query)
      .skip(skip)
      .limit(limit)
      .sort('name');
  }

  find.exec((err, hotels) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: 'Error en la petición' });
    }
    if (!hotels || hotels.length == 0) {
      return res.status(404).send({ message: 'there are not hotels' });
    }
    return res.status(200).send({ hotels });
  });
}

module.exports = {
  getHotels
};
