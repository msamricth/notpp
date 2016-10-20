var request = require('request')

module.exports = function(config,callback){
  if(!config) throw new Error("No config passed. Please pass a config to reply.")
  if(!config.twitter) throw new Error("No Twitter config object in your config file. add one.")
  if(!config.twitter.consumer_key) throw new Error("No Twitter consumer_key in your config file. add one.")
  if(!config.twitter.consumer_secret) throw new Error("No Twitter consumer_secret in your config file. add one.")
  if(!config.twitter.access_token_key) throw new Error("No Twitter access_token_key in your config file. add one.")
  if(!config.twitter.access_token_secret) throw new Error("No Twitter access_token_secret in your config file. add one.")
  if(!config.keywords) throw new Error("No keywords found in config. Please add a keywords string.")
  if(!config.match) throw new Error("No match object found in config. Please add a match regex.")
  if(!config.replies) throw new Error("No replies array found in config. Please add a replies array.")}

  var tracery = require('./tracery/traceryCore');    
var TwitterPackage = require('twitter');
var secret = {
    consumer_key: "ceooAEZ4wBFGBDTkoGBzMxBjN",
      consumer_secret: "pP7r7osttnZnx60PEilf6aqHzuKjs6Lzd3uXIqy8X0EXNLiyJ6",
      access_token_key: "768831126097887232-osNkiSROJsKkNKtuNgpWzKbC1ohJURk",
      access_token_secret: "kcgTlbf5SwYUzYpbPgroKlQn0EL42T0st0LxFHG5scwcK"
}
var Twitter = new TwitterPackage(secret);
    var match = config.match
  var keywords = config.keywords
  if(Array.isArray(keywords)) keywords = keywords.join(',')
//  var match = match
//  try {
//    match = new RegExp(match,'i')
 // } catch(e){
   // logger.warn('failed to parse match as a regex. Will try to match as a string, but no promises.')
//  }

// Call the stream function and pass in 'statuses/filter', our filter object, and our callback
Twitter.stream('statuses/filter', {track: match}, function(stream) {

  // ... when we get tweet data...
  stream.on('data', function(tweet) {

    // print out the text of the tweet that came in
    console.log(tweet.text);
     var rawGrammar = 
    {
      'animal': ['panda','fox','capybara','iguana'],
      'emotion': ['sad','happy','angry','jealous'],
      'origin':['I am #emotion.a# #animal#.'],
    };
       var processedGrammar = tracery.createGrammar(rawGrammar);

    processedGrammar.addModifiers(tracery.baseEngModifiers); 

    var statusObj = processedGrammar.flatten("#origin#");
    //build our reply object

    //call the post function to tweet something
    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      //if we get an error print it out
      if(error){
        console.log(error);
      }

      //print the text of the tweet we sent out
      console.log(tweetReply.text);
    });
  });

  // ... when we get an error...
  stream.on('error', function(error) {
    //print out the error
    console.log(error);
  });
});


