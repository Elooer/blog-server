const express = require('express')
const router = express.Router()
const { addComment, getCommentList, addResponse, getMessagePageInfo, deleteMessage } = require('../controler/message')

router.post('/addComment', addComment)

router.post('/getCommentList', getCommentList)

router.post('/getMessagePageInfo', getMessagePageInfo)

router.post('/deleteMessage', deleteMessage)

router.post('/addResponse', addResponse)

module.exports = router