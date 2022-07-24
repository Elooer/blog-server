const mongoose = require('../db')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pubTime: {
    type: Date,
    default: new Date
  }
})

module.exports = Article = mongoose.model('articles', articleSchema)