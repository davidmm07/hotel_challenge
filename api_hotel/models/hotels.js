'use strict'
let mongoose = require('mongoose')
let Float = require('mongoose-float').loadType(mongoose);
let Schema = mongoose.Schema;
let HotelsSchema = Schema({
  id: String,
  name: String,
  stars: Number,
  price: { type: Float },
  image: String,
  amenities:[{ type:String}]
})

module.exports = mongoose.model('hotels', HotelsSchema)