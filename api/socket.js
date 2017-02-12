module.exports = function(io, twitter) {

  function createStream (keyword) {
    var stream = twitter.stream('statuses/filter', {track : keyword, language: 'en'})
      stream.on('tweet', function (tweet) {
      let tweetUrl = null
      let imageUrl = null
      if (tweet.entities.media) {
          tweetUrl = tweet.entities.media[0].expanded_url
      }
      if (tweet.user.profile_image_url) {
          imageUrl = tweet.user.profile_image_url
      }
      const newData = [
          tweet.text,
          tweetUrl,
          imageUrl,
          tweet.user.screen_name
      ]
      io.sockets.emit("twitter-stream", newData);
    })
    stream.on('error', function(error) {
      return console.log('error', error)
    })
    stream.on('limit', function (limitMessage) {
      console.log('limitMessage', limitMessage)
    })
    stream.on('connected', function (response) {
      //console.log('is connected!')
    })

    return stream
    
  }

  let stream = null
  let currentSockets = 0
  let currentKeyword = null

  io.sockets.on('connection', function(socket){

    currentSockets++;

    socket.emit('connected', currentKeyword); 

    if (currentKeyword === null && stream === null) {    
      socket.on('start-stream', function(data) {
        currentKeyword = data.view
        stream = createStream(data);
      })
    } else if (currentKeyword !== null && stream === null) {
      stream = createStream(currentKeyword);
    }
    

    socket.on('disconnect', function () {
        currentSockets--; 

        if (stream !== null && currentSockets <= 0) {   
            stream.stop(); 
            stream = null;
            currentSockets = 0;
            console.log('No active sockets, disconnecting from stream');
        }
    });

    socket.on('keyword-change', function (keyword) {   
      console.log('keyword', keyword)
        if (stream !== null) {   
            stream.stop(); 
            console.log('Stream Stopped'); 
        }

        stream = createStream(keyword); 

        currentKeyword = keyword; 

        io.sockets.emit('keyword-changed', currentKeyword); 

        console.log('Stream restarted with keyword => ' + currentKeyword);
    });

  })
}
