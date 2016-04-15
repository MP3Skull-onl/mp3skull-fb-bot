var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var path = require('path');
var moment = require('moment');

var bot = require('../modules/bot').Bot;

var configFile = path.resolve(__dirname + '/../config.json');
var nconf = require('nconf');
nconf
	.argv()
	.env()
	.file({file: configFile});

var appOptions = {
	fbToken: nconf.get("FB_TOKEN"),
	botToken: nconf.get("FB_BOT_TOKEN")
};

router.get('/', function(req, res) {
  
  res.send('Hello i\'m the mp3skull robot!');
});

router.get('/webhook/', function(req, res) {
  
  if (req.query['hub.verify_token'] === appOptions.botToken) {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

router.post('/webhook/', function (req, res) {
  
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      
      text = event.message.text;
      bot.handle(sender, text);
    }
  }
  res.sendStatus(200);
});

module.exports = router;