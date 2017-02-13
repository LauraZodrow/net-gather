const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const serveStatic = require('serve-static')
const routes = require('./api/routes')
const mongoose = require('mongoose');
const sockets = require('./api/socket')
const Twitter = require('twit')
const ArticleService = require('./api/ArticleService')

const twitter = new Twitter({
  consumer_key: "BSN8JOEEDLCB4EOgSJT8hTWWO",
  consumer_secret: "H9j6bCuUl48CpoVOc4MNnxgpdnGrhc7gaMzTePnAnKcSqDr80u",
  access_token: "468388067-VkXEzmvpdXoVpOYgeXrq1VcHAWDyDQKvKbYVw5fQ",
  access_token_secret: "cgrmisBMM6yhQiq3tRWBuGzRoLRk7NfeICKShgYbY5yFa",
  timeout_ms: 60*1000, 
})


const app = express();

app.use(bodyParser.json())

const getClientAddr = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://net-gather.herokuapp.com'
  } else {
    return 'http://localhost:8080'
  }
}

const cors = CORS({
    origin: getClientAddr(),
    methods: ['GET', 'POST'],
    credentials: true
})
console.log('process.env.MONGO_URI', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI || 'localhost/net-gather')
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

app.use(cors)
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {

  app.use(serveStatic(__dirname + '/public'))

  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })

}

setInterval( function(){ 
  ArticleService.nytGrab('feminism')
  ArticleService.mediumGrab('feminism')
}, 1000 * 60);

setInterval( function(){ 
  ArticleService.nytGrab('javascript')
  ArticleService.mediumGrab('javascript')
}, 1000 * 220);
//1000 * 60 * 60 * 24

const server = app.listen(process.env.PORT || 3001, () => {
    console.log("API listening at 3001");
});

const io = require('socket.io').listen(server);

sockets(io, twitter)