const express = require('express')
const router = express.Router()
const { addComment, getCommentList, addResponse, getMessagePageInfo, deleteMessage } = require('../controler/message')
const auth = require('../utils/auth')

router.post('/addComment', addComment)

router.post('/getCommentList', getCommentList)

router.post('/getMessagePageInfo', getMessagePageInfo)

router.post('/deleteMessage', auth, deleteMessage)

router.post('/addResponse', addResponse)

module.exports = router