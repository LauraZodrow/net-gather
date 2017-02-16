var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeminismTweetSchema = new Schema({
  array: Array
});

module.exports = mongoose.model('FeminismTweet', FeminismTweetSchema);