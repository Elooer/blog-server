const User = require('../model/user')

// 获取用户列表
exports.getUserList = (req, res) => {
  console.log('token信息对象', req.auth)
  const {page} = req.body
  User.find({}, {username: 1, role: 1, createdTime:1}).sort({'_id': '-1'}).skip((page -1)*10).limit(10).then(data => {
    res.send({
      status: 200,
      message: '获取用户列表成功！',
      data
    })
  }).catch(err => {
    res.sendResult(err)
  })
}

// 分页信息
exports.getUserPageInfo = (req, res) => {
  const {page} = req.body
  User.find({state: true}).count().then(data => {
    if(data) {
      res.send({
        status: 200,
        message: '获取分页信息成功！',
        data: {
          current: page,
          total: data
        }
      })
    }
  })
}