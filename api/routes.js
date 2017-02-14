const express = require('express');
const sendJson = require('./utils/sendJson');
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
  const query = { category: view, type: 'medium' };
  Article.findOne(query, function(err, doc){
    if (err) {
      return console.log('err', err)
    }
    sendJson(res, doc)
  })
});

module.exports = routes;