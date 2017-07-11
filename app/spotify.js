

let spotify = (spec) => {
  let that;
  const Spotify = require('node-spotify-api');
  let spotify = new Spotify({
  id: spec.client_id,
  secret: spec.client_secret,
});

  function getSongInfo(cb) {
    spotify.search({ type: 'track', query: 'All the Small Things', limit: 10 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      let details =  data.tracks.items.map(findDetails);
       cb(details);
    });
  }

  function findDetails(info) {
    let trackInfo = {};
    Object.keys(info).map(key => {
      console.log('What is the info with key', key);
      switch (key) {
        case 'album':
          trackInfo.albumName = info[key].name;
          break;
        case 'name':
           trackInfo.name = info[key]
          break;
        case 'artists':
          let artistName = info[key].map((artist) => {
            return artist.name;
          });
          trackInfo.artistName = artistName[0];
          break;

        default:

      };
    });
    return trackInfo;
  }

  that = {};
  that.getSongInfo = getSongInfo;
  return that;
}

module.exports = spotify;
