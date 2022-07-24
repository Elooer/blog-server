const joi = require('joi')

exports.loginSchema = joi.object({
  username: joi.string().min(2).max(8).required().error(new Error('用户名不合法')),
  password: joi.string().required().regex(/^[a-zA-Z0-9]{6,12}$/).error(new Error('密码不合法'))
})