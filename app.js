const express = require('express')
require('./db')
const app = express()

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析 application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 在路由之前，封装 res.sendResult 函数
app.use((req, res, next) => {
  // status 默认值为400，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.sendResult = function(err, status = 400) {
      res.send({
          status,
          message: err instanceof Error ? err.message : err
      })
  }
  next()
})

// 要在路由之前配置解析 token 的中间件
const {expressjwt} = require('express-jwt')
const config = require('./config')

// 除了以user开头的接口都需要token
app.use('/message',expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }))

// 用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)

// 用户信息路由模块
const userInfoRouter = require('./router/userinfo')
app.use('/my', userInfoRouter)

// 文章路由模块
const articleRouter = require('./router/article')
app.use('/article', articleRouter)

app.listen(3006, () => {
  console.log('app server running at http://127.0.0.1:3006')
})