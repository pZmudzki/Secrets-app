const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  secret: String,
});

module.exports = new mongoose.model('Post', postSchema);