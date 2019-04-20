var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');
var images = require('./routes/images');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/image', images);

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(err.status).json({
        error: err,
    });
})

module.exports = app;
