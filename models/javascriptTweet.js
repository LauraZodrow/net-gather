var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JavascriptTweetSchema = new Schema({
  array: Array
});

module.exports = mongoose.model('JavascriptTweet', JavascriptTweetSchema);
