const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog',{
  useNewUrlParser: true, // 使用一个新的url解析器，用于解决一些安全性问题
  useUnifiedTopology: true // 使用一个统一的新的拓扑结构
})

mongoose.connection.on('open', (err) => {
  if(!err) {
    console.log('数据库连接成功')
  } else {
    console.log('数据库连接失败')
  }
})

module.exports = mongoose