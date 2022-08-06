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
  const {count} = req.body
  Message.find({}).sort({'_id': '-1'}).limit(10*count).then(data => {
    if(data) {
      Message.count().then(total => {
        res.send({
          status: 200,
          message: '获取留言列表成功',
          data: {
            total,
            list: data
          }
        })
      })
      
    }
  })
}

exports.addResponse = (req, res) => {
  const {id, userinfo, comments} =  req.body
  console.log(req.body)
  let username = '游客'
  if(userinfo) {
    username = jwt_decode(userinfo).username
  }
  Message.updateOne({_id: id}, {$addToSet: {response: {username, comments}}}).then(data => {
    if(data) {
      res.send({
        status: 200,
        message: '回复成功！'
      })
    }
  })
}