const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const pingRouter = require('./routes/ping');
const initRouter = require('./routes/initialize');

const app = express();
global.FLEETDB_DEV = [];
global.con = mysql.createConnection({
	host: "localhost",
	user: "labmaster",
	password: "ZdxbegR9@588@!E^",
	port: '/tmp/mysql.sock'
});

con.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ping', pingRouter);
app.use('/init', initRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;