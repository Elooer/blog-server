const express = require('express')
const router = express.Router()
const {register, login} = require('../controler/user')

// 注册
router.post('/register', register)
// 登录
router.post('/login', login)

module.exports = router