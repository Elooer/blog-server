const mongoose = require('../db')

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  createdTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Number,
    default: 1
  }
})

module.exports = User = mongoose.model('users', userSchema)