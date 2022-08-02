const express = require('express')
const router = express.Router()
const {addArticle, getArticleList, getArticleById, getPageInfo, getRecord} = require('../controler/article')

// 添加文章
router.post('/addArticle', addArticle)
// 获取文章列表
router.post('/getArticleList', getArticleList)
// 根据id获取文章信息
router.post('/getArticleById', getArticleById)
// 获取分页信息
router.post('/getPageInfo', getPageInfo)
// 归档
router.get('/getRecord', getRecord)

module.exports = router