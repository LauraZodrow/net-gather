const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const serveStatic = require('serve-static')

const app = express();

app.use(bodyParser.json())

const getClientAddr = () => {
  if (process.env.NODE_ENV === 'production') {
    console.log('in production')
    return 'https://net-gather.herokuapp.com/'
  } else {
    console.log('not in production')
    return 'http://localhost:3000'
  }
}

const cors = CORS({
    origin: getClientAddr(),
    methods: ['GET', 'POST'],
    credentials: true
})

app.use(cors)

if (process.env.NODE_ENV === 'production') {

  console.log('path',__dirname )

  app.use(serveStatic(path.resolve(__dirname, '/public')))

  // const handleRender = require(path.join(__dirname,'/client/dist/server.bundle.js'));
  app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
  })

}

//const server = 
app.listen(process.env.PORT || 3001, () => {
    console.log("API listening");
});