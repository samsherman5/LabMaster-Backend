const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const rfs = require('rotating-file-stream')
const logger = require('morgan');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

/* client-facing route imports */
const indexRouter = require('./api/routes/index');
const usersRouter = require('./api/routes/users');
const pingRouter = require('./api/routes/ping');
const initRouter = require('./api/routes/initialize');
const commandRouter = require('./api/routes/commands')

/*DB conneection*/
mongoose.connect(
	'mongodb+srv://admin:'
	+ process.env.MONGO_PASS +
	'@cluster0.0kbfhd8.mongodb.net/?retryWrites=true&w=majority',
);
mongoose.Promise = global.Promise;

const app = express();
global.FLEETDB_DEV = [];

var accessLogStream = rfs.createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, 'log')
});

//app.use(logger('combined', { stream: accessLogStream }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ping', pingRouter);
app.use('/init', initRouter);
app.use('/commands', commandRouter);

app.use((req, res, next) => {
	const error = new Error('Page not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
