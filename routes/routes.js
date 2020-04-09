const express = require('express');
const controller = require('../controllers/controller.js');

const app = express();

app.get('/favicon.ico', controller.getFavicon);
app.get('/', controller.getIndex);
app.get('/getCheckNumber', controller.getCheckNumber);
app.get('/add', controller.getAdd);
app.get('/delete', controller.getDelete);

module.exports = app;
