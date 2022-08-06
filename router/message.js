const express = require('express')
const router = express.Router()
const {addComment, getCommentList, addResponse} = require('../controler/message')

router.post('/addComment', addComment)

router.post('/getCommentList', getCommentList)

router.post('/addResponse', addResponse)

module.exports = router