var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  category: String,
  type: String,
  articles: Array,
});

module.exports = mongoose.model('Article', ArticleSchema);