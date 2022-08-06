const mongoose = require('../db')

const responseSchema = new mongoose.Schema({
  pubTime: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    default: '游客'
  },
  avatar: {
    type: String,
    default: 'https://img.ifuntools.cn/images/1610033839514.png'
  },
  comments: {
    type: String,
    required: true
  }
})

const messageSchema = new mongoose.Schema({
  pubTime: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    default: '游客'
  },
  avatar: {
    type: String,
    default: 'https://img.ifuntools.cn/images/1610033839514.png'
  },
  comments: {
    type: String,
    required: true
  },
  response: [responseSchema]
})

module.exports = Message = mongoose.model('messages', messageSchema)