module.exports = function(io, twitter) {

  let feminismStream = null
  let javascriptStream = null
  let currentSockets = 0

  io.sockets.on('connection', function(socket){

    currentSockets++;

    socket.on('chat message', function(msg){
        io.sockets.emit('chat message', msg);
    });

    if (feminismStream === null) {    
        feminismStream = twitter.stream('statuses/filter', {track : 'feminism', language: 'en'})
        feminismStream.on('tweet', function (tweet) {
            let tweetUrl = null
            let imageUrl = null
            if (tweet.entities.media) {
                tweetUrl = tweet.entities.media[0].expanded_url
            }
            if (tweet.user.profile_image_url) {
                imageUrl = tweet.user.profile_image_url_https
            }
            const newData = [
                tweet.text,
                tweetUrl,
                imageUrl,
                tweet.user.screen_name
            ]
            io.sockets.emit("twitter-feminism-stream", newData);
        })
        feminismStream.on('error', function(error) {
            return console.log('error', error)
        })
        feminismStream.on('limit', function (limitMessage) {
            io.sockets.emit("limit");
        })
    }

    if (javascriptStream === null) {    
        javascriptStream = twitter.stream('statuses/filter', {track : 'javascript,react.js', language: 'en'})
        javascriptStream.on('tweet', function (tweet) {
            let tweetUrl = null
            let imageUrl = null
            if (tweet.entities.media) {
                tweetUrl = tweet.entities.media[0].expanded_url
            }
            if (tweet.user.profile_image_url) {
                imageUrl = tweet.user.profile_image_url_https
            }
            const newData = [
                tweet.text,
                tweetUrl,
                imageUrl,
                tweet.user.screen_name
            ]
            io.sockets.emit("twitter-javascript-stream", newData);
        })
        javascriptStream.on('error', function(error) {
            return console.log('error', error)
        })
        javascriptStream.on('limit', function (limitMessage) {
            io.sockets.emit("limit");
        })
    }

    socket.on('disconnect', function () {
        currentSockets--; 

        if (javascriptStream !== null && currentSockets <= 0) {   
            javascriptStream.stop(); 
            javascriptStream = null;
            currentSockets = 0;
            console.log('No active sockets, disconnecting from stream');
        }

        if (feminismStream !== null && currentSockets <= 0) {   
            feminismStream.stop(); 
            feminismStream = null;
            currentSockets = 0;
            console.log('No active sockets, disconnecting from stream');
        }

    });

  })
}
