const express = require('express');
const router = require('./router');

const app = express();

app.use('/', router);

app.listen(3000, function() {
    console.log('====================================');
    console.log('App is running');
    console.log('====================================');
});