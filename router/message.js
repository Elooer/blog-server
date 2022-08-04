const express = require('express')
const router = express.Router()
const {addComment} = require('../controler/message')

router.post('/addComment', addComment)

module.exports = router