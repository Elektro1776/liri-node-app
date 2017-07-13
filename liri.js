const keys = require('./keys');
const twitter = require('./app/twitter')(keys.TWITTER);
const spotify = require('./app/spotify')(keys.SPOTIFY);
const omdb = require('./app/omdb')(keys.OMDB);
const fs = require('fs');
var colors = require('colors');

let command = process.argv[2];
let query = process.argv[3];
var logger = fs.createWriteStream('log.txt', {
  flags: 'a' // 'a' means appending (old data will be preserved)
})
function runIt(command) {
  switch (command) {
    case 'my-tweets':{
      // console.log(' WHAT IS OUR TWITTER ???', twitter);
      let screenName = query;
      return twitter.fetchTweets(screenName, (err, tweets) => {
        if (!err) {
          console.log(tweets);
          writeLog(command, JSON.stringify(tweets).green)

          return
        }
        console.log('We have an Error Huston', err.red);
        return
      });
      break;
    }
    case 'spotify-this-song': {
      let songTrack = query;
      return spotify.getSongInfo(songTrack, (err, info) => {
        if(!err) {
          writeLog(command, JSON.stringify(info).green)
          console.log('Track Info:'.cyan, JSON.stringify(info).green);
          return
        }
        console.log(' THERE WAS AN ERROR FIND YOUR SONG:', err.red);
        return
      });
      break;
    }
    case 'movie-this': {
      let movie = query;
    return  omdb.fetchMovieInfo(movie).then((movieValue) => {
        console.info('Your movie info:'.cyan, JSON.stringify(movieValue).green);
        writeLog(command, JSON.stringify(movieValue).green)

      }).catch((err) => {
        console.warn("Error Retreving Video Info", err.red);
      })
      break;
    }
    case 'do-what-it-says':
      return readRandomFile()
      break;
    break;
    default:

  }
};
runIt(command);
function readRandomFile(cb) {
  fs.readFile('./random.txt', (err, data) => {
    if (err) throw err.red;
    let text = data.toString();
    let splitText = text.split(',');
    // console.log(' WHAT IS THE splitText', splitText);
    let command = splitText[0];
    query = splitText[1];
     runIt(command);
  });
}
function writeLog(command, output) {

let result = `Command::: ${command}:::\n Result:::${output} \n`;
logger.write(`${result}\n`, 'utf8') // append string to your file again
}
