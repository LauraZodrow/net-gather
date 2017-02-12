const express = require('express');
const sendJson = require('./utils/sendJson');
const request = require('request');
const Feed = require('rss-to-json');
const getOverlayColorPicker = require('./utils/overlayColorPicker')
const getCatPlaceholder = require('./utils/catPlaceholderPicker')
const _ = require('lodash')
// const ArticleData = require('../models/articleData')
// const mongoose = require('mongoose');

let config = {}
if (process.env.NODE_ENV !== 'production') {
  config = require('./config')
}

const routes = express.Router();

let lastResults = {}

const feedLoadPromise = url => {
  return new Promise((resolve, reject) => {
    if (lastResults[url]) {
      resolve(lastResults[url])
    } else {
      Feed.load(url, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    }
  })
}

routes.get('/nyt-articles/:view', (req, res) => {
  
  const quary = req.params.view
  
  request.get({
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
    qs: {
      'api-key': config.NYT_KEY || process.env.NYT_KEY,
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
        imageUrl = 'https://www.nytimes.com/' + item.multimedia[1].url
      } else {
        imageUrl = getCatPlaceholder()
      }
      const article = [
        item.headline.main,
        item.web_url,
        imageUrl,
        getOverlayColorPicker()
      ]
      articles.push(article)
    })
 
    const nytObject = {
      type: 'nyt',
      articles: articles
    }

    // newArticleData = ArticleData({
    //   type: 'nyt',
    //   articles: articles
    // })

    // newArticleData.save(function(err) {
    //   if (err) throw err;

    //   console.log('newArticleData created!');
    // });

    sendJson(res, nytObject)
  })

})

routes.get('/medium/:view', (req, res) => {
  const view = req.params.view

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

  if (view == 'feminism') {

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
      const medium = {
        type: 'medium',
        articles: results
      }
      sendJson(res, medium)
    })
    .catch(err => {
      console.log('err', err)
    })

  } else if ('coding') {

    Promise.all([
      feedLoadPromise('https://backchannel.com/feed')
      .then( results => {
        return mapArray(results.items)
      }),
      feedLoadPromise('https://medium.freecodecamp.com/feed')
      .then( results => {
        return mapArray(results.items)
      }),
      feedLoadPromise('https://hackernoon.com/feed')
      .then( results => {
        return mapArray(results.items)
      })
    ])
    .then(values => { 
      const results = _.flatten(values)
      const medium = {
        type: 'medium',
        articles: results
      }
      sendJson(res, medium)
    })
    .catch(err => {
      console.log('err', err)
    });
  
  }

});

module.exports = routes;