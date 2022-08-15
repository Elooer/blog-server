const User = require('../model/user')
// 导入生成 token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
// 导入校验规则
const { loginSchema, registerSchema } = require('../schema/user')
const bcrypt = require('bcryptjs')

// 注册
exports.register = (req, res) => {
  // console.log(req.body)
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return res.sendResult(error)
  }
  let { username, password } = req.body
  password = bcrypt.hashSync(password, 10)
  User.findOne({ username }).then(data => {
    console.log(data)
    if (data !== null) {
      return res.sendResult('用户名已存在，请更换！')
    }
    if (!data) {
      const user = new User({
        username,
        password
      })
      user.save((err, data) => {
        if (err) res.sendResult(err)
        else res.send({
          status: 200,
          message: '注册成功！'
        })
      })
    }
  }).catch(err => res.sendResult(err))
}

// 登录
exports.login = (req, res) => {
  console.log(req.body)
  const { username, password } = req.body
  const { error } = loginSchema.validate(req.body)
  if (error) {
    return res.sendResult(error)
  }
  User.findOne({ username, status: 1 }).then(data => {
    if (!data) {
      res.sendResult('该用户不存在！')
    } else if (!bcrypt.compareSync(password, data.password)) {
      res.sendResult('用户名或密码错误')
    } else {
      // 对用户的信息进行加密，生成 token 字符串
      const token = jwt.sign({ username, _id: data._id, role: data.role }, config.jwtSecretKey, { expiresIn: config.expiresIn })
      res.send({
        status: 200,
        message: '登录成功！',
        data: {
          token: 'Bearer ' + token
        }
      })
    }
  })
}