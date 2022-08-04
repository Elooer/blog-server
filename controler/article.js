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
  Article.find({state: true}).count().then(data => {
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

// 归档
exports.getRecord = (req, res) => {
  Article.aggregate([
    {
      $match: {
        'state': true
      }
    },
    {
      $project:{
        year: {$substr: [{"$add":["$pubTime", 28800000]}, 0, 4]},
        date: {$substr: [{"$add":["$pubTime", 28800000]}, 5, 5]},
        'title': 1,
        '_id': 1
      },
   },
    {
      $group: {
        _id: '$year',
        list: {$push: {_id: '$_id', title: '$title', date: '$date'}}
      }
    },
    {
      $sort: {_id: -1}//根据date排序
   }
  ]).then(data => {
    Article.aggregate([{
      $match: {
        'state': true
      }},{
        $group: {
          _id: '$tag',
          count: {$sum: 1}
        }
      },
    ]).then(data2 => {
      res.send({
        status: 200,
        message: '获取归档信息成功!',
        data: {
          list: data,
          tag: data2
      }
      })
    }).catch(err1 => res.sendResult(err1))
    
  }).catch(err => res.sendResult(err))
}