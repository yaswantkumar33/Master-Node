const express = require('express');
const app = express();
const morgan = require('morgan');

const routes = require('./routes')


// middlewares 
app.use(morgan('dev'));

// routes 
app.use('/', routes);


module.exports = app;