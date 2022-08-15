const express = require('express')
const router = express.Router()
const { addArticle, getArticleList, getArticleById, getPageInfo, getRecord, updateArticle, getArticleByTag, deleteArticle } = require('../controler/article')

// 添加文章
router.post('/addArticle', addArticle)
// 获取文章列表
router.post('/getArticleList', getArticleList)
// 根据id获取文章信息
router.post('/getArticleById', getArticleById)
// 根据tag获取文章
router.post('/getArticleByTag', getArticleByTag)
// 获取分页信息
router.post('/getPageInfo', getPageInfo)
// 归档
router.get('/getRecord', getRecord)
// 更新文章
router.post('/updateArticle', updateArticle)
// 删除文章
router.post('/deleteArticle', deleteArticle)

module.exports = router