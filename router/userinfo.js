const express = require('express')
const router = express.Router()
const { getUserList, getUserPageInfo } = require('../controler/userinfo')
const auth = require('../utils/auth')

router.post('/getUserList', auth, getUserList)
router.post('/getUserPageInfo', auth, getUserPageInfo)

module.exports = router