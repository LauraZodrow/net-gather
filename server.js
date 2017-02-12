const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const serveStatic = require('serve-static')
const routes = require('./api/routes')
// const mongoose = require('mongoose');
// const ArticleData = require('./models/articleData');
// const config = require('./config')
const sockets = require('./api/socket')
const Twitter = require('twit')


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

// mongoose.connect(config.database)
// mongoose.connection.on('error', function() {
//   console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
// });

app.use(cors)
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {

  app.use(serveStatic(__dirname + '/public'))

  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })

}

const server = app.listen(process.env.PORT || 3001, () => {
    console.log("API listening at PORT:" + process.env.PORT);
});

const twitter = new Twitter({
  consumer_key: "BSN8JOEEDLCB4EOgSJT8hTWWO",
  consumer_secret: "H9j6bCuUl48CpoVOc4MNnxgpdnGrhc7gaMzTePnAnKcSqDr80u",
  access_token: "468388067-VkXEzmvpdXoVpOYgeXrq1VcHAWDyDQKvKbYVw5fQ",
  access_token_secret: "cgrmisBMM6yhQiq3tRWBuGzRoLRk7NfeICKShgYbY5yFa",
  timeout_ms: 60*1000, 
})

const io = require('socket.io').listen(server);

sockets(io, twitter)