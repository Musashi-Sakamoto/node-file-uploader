var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

const api = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require('./passport');

app.use('/api/v1', api);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    error: err
  });
});

module.exports = app;
