var express = require('express');
var path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser');

var todoRouter = require('./routes/todo');

var app = express();

app.use(logger('dev'));
// for parsing application/json
app.use(express.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());

// for parsing application/xwww-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true}));


app.use('/todo', todoRouter);

module.exports = app;
