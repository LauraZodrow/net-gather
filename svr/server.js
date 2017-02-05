const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const serveStatic = require('serve-static')

const app = express();

app.use(bodyParser.json())

const getClientAddr = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://femsnow.herokuapp.com/'
  } else {
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

  //app.use(serveStatic(__dirname + '/client/public'))

  // const handleRender = require(path.join(__dirname,'/client/dist/server.bundle.js'));
  // app.use('/', handleRender)

}

//const server = 
app.listen(process.env.PORT || 3001, () => {
    console.log("API listening");
});