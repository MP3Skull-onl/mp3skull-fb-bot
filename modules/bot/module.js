var path = require('path');
var nconf = require('nconf');
var request = require('request');
var _ = require('underscore');

var configFile = path.resolve(__dirname + '/../../config.json');
nconf
	.argv()
	.env()
	.file({file: configFile});

var appOptions = {
	fbToken: nconf.get("FB_TOKEN"),
	botToken: nconf.get("FB_BOT_TOKEN")
};

var bot = {};

bot.handle = function(sender, text) {
  
  console.log('Received: '+text);
  var isYouTube = bot.isYouTube(text);
  if(isYouTube !== false) {
    
    bot.send(sender, 'You can find your download here:' + "\r\n" + 'https://mp3skull.onl/api/youtube/frame/#/?id=' + isYouTube);
  } else if(text.toLowerCase().indexOf('search:') !== -1) {
    
    var song = text.substring(text.toLowerCase().indexOf('search:')+('search:').length, text.length);
    bot.find(song.trim(), function(ytId) {
      
      bot.send(sender, 'The best result for "'+song+'" is:' + "\r\n" + 'https://mp3skull.onl/api/youtube/frame/#/?id=' + ytId);
    });
  }
};

bot.isYouTube = function(text) {
  
  var regExpr = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  var curVal = text;
  return (curVal.match(regExpr))? RegExp.$1 : false;
};

bot.find = function(song, cb) {
  
  request({
    url: 'https://mp3skull.onl/api/youtube/search?q='+song,
    method: 'GET'
  }, function(error, response, body) {
    if (error) {
      
      console.log('Error: ', error);
    } else if (response.body.error) {
      
      console.log('Error: ', response.body.error);
    } else {
      
      if(response.body) {
        
        jdata = JSON.parse(response.body);
        if(!_.isUndefined(jdata[0]) && !_.isUndefined(jdata[0].id)) {
          
          cb(jdata[0].id);
        }
      }
    }
  });
};

bot.send = function(sender, message) {
  
  messageData = {
    text:message
  };
  
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: appOptions.fbToken},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: messageData,
    }
  }, function(error, response, body) {
    if (error) {
      
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      
      console.log('Error: ', response.body.error);
    }
  });

}

module.exports = bot;