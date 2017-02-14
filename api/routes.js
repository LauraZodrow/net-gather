const express = require('express');
const sendJson = require('./utils/sendJson');
const request = require('request');
const Feed = require('rss-to-json');
const getOverlayColorPicker = require('./utils/overlayColorPicker')
const getCatPlaceholder = require('./utils/catPlaceholderPicker')
const Article = require('../models/article')
const mongoose = require('mongoose');

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
  console.log('view', view)
  const query = { category: view, type: 'medium' };
  Article.findOne(query, function(err, doc){
    if (err) {
      return console.log('err', err)
    }
    console.log('doc', doc)
    sendJson(res, doc)
  })
});

module.exports = routes;