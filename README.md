# mp3skull-fb-bot
If a user write a YouTube URL to the fansite - he will automatically get the Converter URL as answer.

# Reuirements

* "Reviewed" Facebook App
* SetUp -> https://developers.facebook.com/docs/messenger-platform/quickstart
  - Use Route https://[your domain]/webhook/ for the webhook url

# SetUp

* Edit config_sample.json
* Rename config_sample.json to config.json
  - YouTube API url should be something like "http://[your domain]/youtube-search?q=" the search query would be added to this string
  - YouTube API url should return an array of objects [{id: '[YouTube ID]'}, {id: '...'}]
* run "npm install"
* run "node index.js"
* Create nginx config & restart nginx

# Preview

* [mp3.skull.to](https://mp3.skull.to "MP3Skull - Free MP3 Download and YouTube Converter")
* https://www.facebook.com/mp3skull.onl
  - Write a pm with a youtube url to this fanpage
  - Write a pm "search: [video name]" to get a result for that
