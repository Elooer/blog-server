const joi = require('joi')

exports.loginSchema = joi.object({
  username: joi.string().min(2).max(8).required(),
  password: joi.string().required().regex(/^[a-zA-Z0-9]{6,12}$/)
})

exports.registerSchema = joi.object({
  username: joi.string().min(2).max(8).required(),
  password: joi.string().required().regex(/^[a-zA-Z0-9]{6,12}$/),
  rePassword: joi.required().equal(joi.ref('password'))
})