//Load twitter module
var Twitter = require('twitter');
//Load de JSON file with bot's keys and tokens
var keys = require('./keysBot.json');

//Create the bot
var client = new Twitter(keys);

//The word that we are going to search in tweets
var word = 'msamricth';
//Variables to store the twitter user id and screen name to make a reply
var id_str, screen_name;


client.stream('statuses/filter', {track: word}, function(stream) {
  console.log('Bot started looking for the word ' + word + '.');
  stream.on('data', function(tweet) {


    var array = tweet.text.split('block ')
    isItChain = array[1][0] + array[1][1] + array[1][2]+array[1][3]+array[1][4]
    if(isItChain == 'chain') { //We have found block chain

        console.log(tweet.text); //Displays the tweet with the word
        //We store the twitter id and the user screen name to make a reply
        id_str = tweet.id_str;
        screen_name = tweet.user.screen_name;

        //Now we are going to reply the tweet
        client.post('statuses/update', {in_reply_to_status_id: id_str,
        status: '@' + screen_name + ' I think you mean "blockchain"'},
        function(error, tweet, response){
            if(error) throw error;
            console.log(tweet);  // Tweet body
        });
    }
   })

  stream.on('error', function(error) {
    throw error;
  });
});
