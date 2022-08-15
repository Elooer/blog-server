const express = require('express')
const router = express.Router()
const {getUserList, getUserPageInfo} = require('../controler/userinfo')

router.post('/getUserList', getUserList)
router.post('/getUserPageInfo', getUserPageInfo)

module.exports = router