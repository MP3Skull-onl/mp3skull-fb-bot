var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

var configFile = path.resolve(__dirname + '/../config.json');
var nconf = require('nconf');
nconf
	.argv()
	.env()
	.file({file: configFile});

var appOptions = {
	fbToken: nconf.get("FB_TOKEN")
};

router.get('/', function(req, res) {
  
  res.send('Hello there');
});

module.exports = router;