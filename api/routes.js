const express = require('express');
const sendJson = require('./utils/sendJson');
const request = require('request');
const Feed = require('rss-to-json');
const getOverlayColorPicker = require('./utils/overlayColorPicker')
const getCatPlaceholder = require('./utils/catPlaceholderPicker')
const _ = require('lodash')

const routes = express.Router();

const feedLoadPromise = url => {
  return new Promise((resolve, reject) => {
    Feed.load(url, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

routes.get('/nyt-articles/:view', (req, res) => {
  
  const quary = req.params.view
  
  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': "f50cd2af9dcf4b18920c4dd01c793af1",
      'q': quary,
      'sort': "newest",
    },
  }, function(err, response, body) {
    body = JSON.parse(body);
    if (!body.response) {
      return console.log('Err', body)
    }
    const docs = body.response.docs
    let imageUrl = null
    let articles = []
    docs.map(( item )=> {
      if (item.multimedia[1]) {
        imageUrl = 'http://www.nytimes.com/' + item.multimedia[1].url
      } else {
        imageUrl = getCatPlaceholder()
      }
      const article = [
        item.headline.main,
        item.web_url,
        imageUrl,
        getOverlayColorPicker(),
        item.snippet
      ]
      articles.push(article)
    })
 
    if(err) {
        res.send(body)
    } else {
        sendJson(res, articles)
    }
  })

})

routes.get('/medium/:view', (req, res) => {
  const view = req.params.view

  if (view == 'feminism') {

    const mapArray = (items) => {
      const array = _.map(items, ( item ) => {
        const fullDescription = item.description.split('"')
        if (!fullDescription[7]) {
          imageURL = getCatPlaceholder()
        } else {
          imageURL = fullDescription[7]
        }
        return [
          item.title,
          item.url,
          imageURL,
          getOverlayColorPicker()
        ]
      })
      return array
    }

    Promise.all([
      feedLoadPromise('https://femsplain.com/feed')
      .then( results => {
        return mapArray(results.items)
      }),
      feedLoadPromise('https://amysmartgirls.com/feed')
      .then( results => {
        return mapArray(results.items)
      }),
      feedLoadPromise('https://medium.com/feed/leanin')
      .then( results => {
        return mapArray(results.items)
      })
    ])
    .then(values => { 
      const results = _.flatten(values)
      sendJson(res, results)
    });

  }

});

module.exports = routes;