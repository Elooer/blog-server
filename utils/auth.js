const User = require('../model/user')

const auth = async (req, res, next) => {
  const data = await User.find({ username: 'Elooer' })
  if (data.length !== 1) {
    return res.sendResult('数据库有误！')
  }
  // console.log(new ObjectId(req.auth._id) === _id)
  if (req.auth.username !== 'Elooer' && req.auth.role !== 'admin') {
    return res.sendResult('没有权限！')
  }
  next()
}

module.exports = auth