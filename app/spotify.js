

let spotify = (spec) => {
  let that;
  const Spotify = require('node-spotify-api');
  let spotify = new Spotify({
  id: spec.client_id,
  secret: spec.client_secret,
});

  function getSongInfo(songTrack, cb) {
    spotify.search({ type: 'track', query: (songTrack || 'Ace of Base') , limit: 10 }, function(err, data) {
      if (err) {
        cb(err, null)
        return;
      }
      let details =  data.tracks.items.map(findDetails);
       return cb(null,details);
    });
  }

  function findDetails(info) {
    let trackInfo = {};
    Object.keys(info).map(key => {
      // console.log('What is the info with key', key);
      switch (key) {
        case 'album':
          trackInfo.albumName = info['album'].name;
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
        case 'preview_url':
          trackInfo.preview_url = info[key];
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
