const express = require('express')
const sendJson = require('./utils/sendJson')
const Article = require('../models/article')
const FeminismTweet = require('../models/feminismTweet')
const JavascriptTweet = require('../models/javascriptTweet')
const mongoose = require('mongoose');
const _ = require('lodash')

const routes = express.Router();

routes.get('/nyt-articles/:view', (req, res) => {
  const view = req.params.view
  const query = { category: view, type: 'nyt' };
  Article.findOne(query, function(err, doc){
    if (err) {
      return console.log('err', err)
    }
    sendJson(res, doc)
  })

})

routes.get('/medium/:view', (req, res) => { 
  const view = req.params.view
  const query = { category: view, type: 'medium' };
  Article.findOne(query, function(err, doc){
    if (err) {
      return console.log('err', err)
    }
    sendJson(res, doc)
  })
});

routes.get('/tweets-feminism', (req, res) => {
  FeminismTweet.find({}, function(err, tweets){
        if(err){
          return console.log(err);
        } else{
            const newTweets = tweets.map(function(item, index) {
              return [item.array]
            })
            sendJson(res, newTweets)
        }
    })
})

routes.get('/tweets-javascript', (req, res) => {
  JavascriptTweet.find({}, function(err, tweets){
        if(err){
          return console.log(err);
        } else{
            const newTweets = tweets.map(function(item, index) {
              return [item.array]
            })
            sendJson(res, newTweets)
        }
    })
})

module.exports = routes;