const express = require('express')
const router = express.Router()
const {addArticle} = require('../controler/article')

router.post('/addArticle', addArticle)

module.exports = router