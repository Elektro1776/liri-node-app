const request = require('request');

let omdb = (spec) => {
  let that = {};
  function fetchMovieInfo(movieTitle) {
    return new Promise((resolve, reject) => {
      let title = movieTitle || 'Mr. Nobody'
      request(`http://www.omdbapi.com/?t=${title}&tomatoes=true&apikey=40e9cece`, (err, response, body) => {
        if(!err) {
          let movie = getDetails(JSON.parse(body));
          // console.log(' WHAT IS THE MOVIE ', JSON.parse(body));
        return  resolve(movie);
        }
        reject(err);
      })
    })
  }
  function getDetails(movie) {
    let movieInfo = {};
    Object.keys(movie).map(key => {
      // console.log(' MOVIE KEY!!!!!!', movie[key]);
      switch (key) {
        case 'Title':
          return movieInfo.title = movie[key];
          break;
        case 'Year':
          movieInfo.year = movie[key];
          break;
        case 'Country':
          movieInfo.country = movie[key];
          break;
        case 'imdbRating':
          movieInfo.imdbRating = movie[key];
          break;
        case 'Language':
          movieInfo.language = movie[key];
          break;
        case 'Plot':
          movieInfo.plot = movie[key];
        break;
        case 'Actors':
          movieInfo.actors = movie[key]
        break;
        case 'tomatoURL':
          movieInfo.tomatoUrl = movie[key];
        break;
        default:
        return movieInfo
      };
    })
    return movieInfo
  }
  that = {};
  that.fetchMovieInfo = fetchMovieInfo;
  return that;
}
module.exports = omdb;
