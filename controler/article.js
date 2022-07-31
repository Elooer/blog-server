const Article = require('../model/article')
const {addArticleSchema} = require('../schema/article')

// 新增文章
exports.addArticle = (req, res) => {
  console.log(req.body)
  const {error} = addArticleSchema.validate(req.body)
  const {title, describe, content, tag} = req.body
  if(error) {
    return res.sendResult(error)
  }
  const article = new Article({
    title,
    describe,
    content,
    tag
  })
  article.save().then(data => {
    res.send(data)
  }).catch(err => res.sendResult(err))
}

// 获取文章列表
exports.getArticleList = (req, res) => {
  const {page} = req.body
  Article.find({state: true}).sort({'_id': '-1'}).skip((page -1)*6).limit(6).then(data => {
    res.send({
      status: 200,
      message: '获取文章列表成功',
      data
    })
  }).catch(err => res.sendResult(err))
}

// 根据id获取文章
exports.getArticleById = (req, res) => {
  const {_id} = req.body
  Article.findById(_id).then(data => {
    Article.updateOne({_id: _id}, {$inc: {count: 1}}, (err, data1) => {
      if(err) res.sendResult(err)
    })
    res.send({
      status: 200,
      message: '获取文章信息成功！',
      data
    })
  }).catch(err => res.sendResult(err))
}

// 分页信息
exports.getPageInfo = (req, res) => {
  const {page} = req.body
  Article.find({}).count().then(data => {
    if(data) {
      res.send({
        status: 200,
        message: '获取分页信息成功！',
        data: {
          current: page,
          total: data
        }
      })
    }
  })
}

function elMessage() {
  success = function() {
    console.log('success')
  }

  this.linli = function() {
    // elMessage({type: 'error', message: ''})
    console.log('linli')
  }
}

let b = {
  success: function() {
  }
}
elMessage() // window
let a = new elMessage()