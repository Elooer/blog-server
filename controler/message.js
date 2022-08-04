const Message = require('../model/message')
const jwt_decode = require('jwt-decode')

exports.addComment = (req, res) => {
  const {userinfo, comments} = req.body
  let username = '游客'
  if(userinfo) {
    username = jwt_decode(userinfo).username
  }
  const comment = new Message({
    username,
    comments
  })
  comment.save().then(data => {
    if(data) {
      res.send({
        status: 200,
        message: '留言成功！'
      })
    }
  }).catch(err => res.sendResult(err))
}

exports.getCommentList = (req, res) => {
  Message.find({}).sort({'_id': '-1'}).then(data => {
    if(data) {
      res.send({
        status: 200,
        message: '获取留言列表成功',
        data
      })
    }
  })
}