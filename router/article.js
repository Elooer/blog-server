const express = require('express')
const router = express.Router()
const {addArticle, getArticleList, getArticleById, getPageInfo} = require('../controler/article')

// 添加文章
router.post('/addArticle', addArticle)
// 获取文章列表
router.post('/getArticleList', getArticleList)
// 根据id获取文章信息
router.post('/getArticleById', getArticleById)
router.post('/getPageInfo', getPageInfo)

module.exports = router