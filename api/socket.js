const Twitter = require('twitter')
const socketio = require('socket.io')

const twitter = new Twitter({
  consumer_key: "BSN8JOEEDLCB4EOgSJT8hTWWO",
  consumer_secret: "H9j6bCuUl48CpoVOc4MNnxgpdnGrhc7gaMzTePnAnKcSqDr80u",
  access_token_key: "468388067-VkXEzmvpdXoVpOYgeXrq1VcHAWDyDQKvKbYVw5fQ",
  access_token_secret: "cgrmisBMM6yhQiq3tRWBuGzRoLRk7NfeICKShgYbY5yFa"
})


//TODO: close socket after certain amount of time

module.exports = function(server) {
  const io = socketio.listen(server)
  io.on('connection', function(socket){
  socket.on("start stream", function(data) {
    twitter.stream('statuses/filter', { track: data.view }, (streamResponse) => {
        streamResponse.on('data', (data) => {
        let tweetUrl = null
        let imageUrl = null
        if (data.entities.media) {
            tweetUrl = data.entities.media[0].expanded_url
        }
        if (data.user.profile_image_url) {
            imageUrl = data.user.profile_image_url
        }
        const newData = [
            data.text,
            tweetUrl,
            imageUrl,
            data.user.screen_name
        ]

        socket.emit("new tweet", newData);
        });
    
        streamResponse.on('error', (error) => {
        socket.emit("twitter error");
        });
    });

  });

});
}

