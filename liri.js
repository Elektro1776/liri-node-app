const keys = require('./keys');
const twitter = require('./app/twitter')(keys.TWITTER);
const spotify = require('./app/spotify')(keys.SPOTIFY);
const omdb = require('./app/omdb')(keys.OMDB);
const fs = require('fs');
var colors = require('colors');

let command = process.argv[2];
let query = process.argv[3];

(function(command) {
  switch (command) {
    case 'my-tweets':{
      // console.log(' WHAT IS OUR TWITTER ???', twitter);
      let screenName = query;
      return twitter.fetchTweets(screenName, (err, tweets) => {
        if (!err) {
          console.log(tweets);
          return
        }
        console.log('We have an Error Huston', err);
        return
      });
      break;
    }
    case 'spotify-this-song': {
      let songTrack = query;
      spotify.getSongInfo(songTrack, (err, info) => {
        if(!err) {
          console.log('Track Info'.cyan, JSON.stringify(info).green);
          return
        }
        console.log(' THERE WAS AN ERROR FIND YOUR SONG:', err);
        return
      });
      break;
    }
    case 'movie-this': {
      let movie = query;
      omdb.fetchMovieInfo(movie).then((movieValue) => {
        console.info('Your movie info:'.cyan, JSON.stringify(movieValue).green);
      })
    }
    break;
    default:

  }
}(command));

function readRandomFile() {
  fs.readFile('./random.txt', (err, data) => {
    if (err) throw err;
    let text = data.toString();
    let splitText = text.split(',');
  })
}
readRandomFile();
