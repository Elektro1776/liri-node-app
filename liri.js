const keys = require('./keys');
const twitter = require('./app/twitter')(keys.TWITTER);
const spotify = require('./app/spotify')(keys.SPOTIFY);
// console.log(' WHAT ARE THE twitterKeys?', keys);
const fs = require('fs');

let command = process.argv[2];

// console.log( 'WHAT IS OUR COMMAND? ', command);

(function(command) {
  switch (command) {
    case 'my-tweets':{
      // console.log(' WHAT IS OUR TWITTER ???', twitter);
      return twitter.fetchTweets();
    }
    case 'spotify-this-song': {
      spotify.getSongInfo((info) => {
        console.log(' FIND SPOTIFY INFO ', info);

      });
    }
    break
    default:

  }
}(command));

function readRandomFile() {
  // console.log(' HELLO RANDOM FILE');
  fs.readFile('./random.txt', (err, data) => {
    if (err) throw err;
    let text = data.toString();
    let splitText = text.split(',');
    // console.log(' THIS IS OUR FILE', splitText);
  })
}
readRandomFile();
