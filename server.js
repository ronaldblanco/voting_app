'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var mongoose = require('mongoose');
var mongo = require('mongodb').MongoClient;
var passport = require('passport');
var session = require('express-session');

var bodyparser = require('simple-bodyparser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretTwitter',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser());

mongo.connect(process.env.MONGO_URI, function (err, db){
	if(err == null) routes(app, passport, db);
	else console.log(err);

//routes(app, passport);

var port = process.env.PORT || 5000 || 8080;
app.listen(port,  function () {
	console.log('Voting App listening on port ' + port + '...');
});

});