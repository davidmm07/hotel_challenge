'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//carga de rutas
var hotel_routes = require('./routes/hotel');

//parseo de jsons
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// configurar cabeceras http (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); //Acceso a todos los dominios
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  ); //cabeceras
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); //Especifica el método (o métodos) permitido al acceder al recurso, en respuesta a una petición de validación.
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); //Lista el rango de métodos de peticiones HTTP aceptadas por un servidor.
  next();
});

// carga de rutas base
app.use('/api', hotel_routes);

module.exports = app;
