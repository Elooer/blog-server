const joi = require('joi')

exports.addArticleSchema = joi.object({
  title: joi.string().required(),
  describe: joi.string().required(),
  content: joi.string().required().allow(''),
  tag: joi.string().required(),
  img: joi.string()
}) 