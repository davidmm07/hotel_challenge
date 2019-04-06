'use strict'

let express = require('express');
let HotelController = require('../controllers/hotels');
let api = express.Router();


api.get('/hotel/:name?', HotelController.getHotels);




module.exports = api;