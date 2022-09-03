const Message = require('../model/message')
const jwt_decode = require('jwt-decode')
const axios = require('axios')

exports.addComment = async (req, res) => {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
  // const ip = '101.46.56.233'
  let location = '未知'
  const { data } = await axios.get(`https://ip.useragentinfo.com/json?ip=${ip}`)
  console.log('data:', data)
  if (data.code !== 200) {
    location = '未获取'
  } else {
    location = '' + data.province + data.city + ' ' + data.isp
  }

  console.log('loc:', location)
  const { userinfo, comments } = req.body
  let username = '游客'
  if (userinfo) {
    username = jwt_decode(userinfo).username
  }
  const comment = new Message({
    username,
    comments,
    ip,
    location
  })
  comment.save().then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '留言成功！'
      })
    }
  }).catch(err => res.sendResult(err))
}

exports.getCommentList = (req, res) => {
  const { count, flag } = req.body
  if (flag) {
    return Message.find({}).sort({ '_id': '-1' }).skip((count - 1) * 10).limit(10).then(data => {
      if (data) {
        Message.count().then(total => {
          res.send({
            status: 200,
            message: '获取留言列表成功',
            data: {
              total,
              list: data,
            }
          })
        })

      }
    })
  }
  Message.find({}, { ip: 0, location: 0 }).sort({ '_id': '-1' }).limit(10 * count).then(data => {
    if (data) {
      Message.count().then(total => {
        res.send({
          status: 200,
          message: '获取留言列表成功',
          data: {
            total,
            list: data,
          }
        })
      })

    }
  })
}

exports.deleteMessage = (req, res) => {
  const { _id } = req.body
  Message.deleteOne({ _id }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '删除留言成功！'
      })
    }
  }).catch(err => res.sendResult(err))
}

exports.getMessagePageInfo = (req, res) => {
  const { page } = req.body
  Message.find({}).count().then(data => {
    if (data) {
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

exports.addResponse = (req, res) => {
  const { id, userinfo, comments } = req.body
  console.log(req.body)
  let username = '游客'
  if (userinfo) {
    username = jwt_decode(userinfo).username
  }
  Message.updateOne({ _id: id }, { $addToSet: { response: { username, comments } } }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '回复成功！'
      })
    }
  })
}