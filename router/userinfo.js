const express = require('express')
const router = express.Router()
const {getUserList} = require('../controler/userinfo')

router.get('/userList', getUserList)

module.exports = router