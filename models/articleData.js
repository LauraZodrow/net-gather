var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleDataSchema = new Schema({
  type: String,
  articles: Array,
});

module.exports = mongoose.model('ArticleData', articleDataSchema);