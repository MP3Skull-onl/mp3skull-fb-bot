var path = require('path');
var express = require('express');

var _ = require('underscore');
var nconf = require('nconf');

nconf
  	.argv()
  	.env()
  	.file({file: './config.json'});
  	

var webOptions = {
	port: nconf.get('PORT'),
	host: nconf.get('HOST')
};

var app = express();

var router = require('./router').Router;
app.use('/', router);

app.listen(webOptions.port);