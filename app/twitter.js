

let tweets = (spec) => {
  let that;
  const Twitter = require('twitter');
  let client = new Twitter({
    consumer_key: spec.consumer_key,
    consumer_secret: spec.consumer_secret,
    access_token_key: spec.access_token_key,
    access_token_secret: spec.access_token_secret
  });
      function fetchTweets(screenName, cb) {
        var params = {screen_name: (screenName || 'ElektricDesign'), count: 20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
          if (!error) {
            tweets.map((tweet) => {
              cb(null,tweet.text)
            })
          } else {
            cb(error, null)
          }
        });
      }
  that = {};
  that.fetchTweets = fetchTweets;
  return that;
}

module.exports = tweets;
