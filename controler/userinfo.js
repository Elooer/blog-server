const User = require('../model/user')

// 获取用户列表
exports.getUserList = (req, res) => {
  console.log('token信息对象', req.auth)
  User.find({}, {username: 1, roles: 1, createdTime:1, status: 1}).then(data => {
    res.send({
      status: 200,
      message: '获取用户列表成功！',
      data
    })
  }).catch(err => {
    res.sendResult(err)
  })
}