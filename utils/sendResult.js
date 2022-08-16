const sendResult = (req, res, next) => {
  // status 默认值为400，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.sendResult = function (err, status = 400) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
}

module.exports = sendResult