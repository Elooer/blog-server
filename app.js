const express = require('express')
require('./db')
const app = express()
const https = require('https')
const fs = require('fs')

// 导入并配置 cors 中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件
// 注意：这个中间件只能解析 application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 在路由之前，注册res.sendResult 函数
const sendResult = require('./utils/sendResult')
app.use(sendResult)

// 要在路由之前配置解析 token 的中间件
const { expressjwt } = require('express-jwt')
const config = require('./config')

// 配置token路由
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({
  path: ['/test', '/user/login', '/user/register', '/article/getArticleList',
    '/article/getArticleById',
    '/article/getArticleByTag',
    '/article/getPageInfo',
    '/article/getRecord',
    '/message/addComment',
    '/message/getCommentList',
    '/message/getMessagePageInfo',
    '/message/addResponse']
}))

// 用户路由模块
const userRouter = require('./router/user')
app.use('/user', userRouter)

// 用户信息路由模块
const userInfoRouter = require('./router/userinfo')
app.use('/userinfo', userInfoRouter)

// 文章路由模块
const articleRouter = require('./router/article')
app.use('/article', articleRouter)

// 留言模块
const messageRouter = require('./router/message')
app.use('/message', messageRouter)

app.use('/test', (req, res) => {
  res.json({
    msg: '测试成功！'
  })
})

const httpsOption = {
  key: fs.readFileSync("./https/elooerblog.top.key"),
  cert: fs.readFileSync("./https/elooerblog.top_bundle.pem")
}

const server = https.createServer(httpsOption, app)

server.listen(5000, () => {
  console.log('app server running at https://127.0.0.1:5000')
})