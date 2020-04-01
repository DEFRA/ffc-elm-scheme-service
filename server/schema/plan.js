const Joi = require('@hapi/joi')

module.exports = Joi.object({
  schemeId: Joi.string().required()
})
