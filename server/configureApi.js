const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routers/api');

function configureApi (app) {
  app.use(bodyParser.json());
  app.use('/assets', express.static(path.join(__dirname, '..', 'client', 'assets')));
  app.use('/api', api);
}

module.exports = configureApi;
