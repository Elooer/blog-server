const mongoose = require('../db')

const messageSchema = new mongoose.Schema({
  pubTime: {
    type: Date,
    default: new Date
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

module.exports = Message = mongoose.model('messages', messageSchema)