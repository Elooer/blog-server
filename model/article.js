const mongoose = require('../db')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  describe: {
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
  },
  tag: {
    type: String,
    required: true
  },
  img: {
    type: String,
    default: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
  },
  state: {
    type: Boolean,
    default: true
  }
})

module.exports = Article = mongoose.model('articles', articleSchema)