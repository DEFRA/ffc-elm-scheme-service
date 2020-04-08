const schema = require('../schema/scheme')
const schemeService = require('../services/scheme-service')

module.exports = {
  method: 'POST',
  path: '/submit',
  options: {
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        console.log(`rejected payload ${request.payload}`)
        return h.response().code(400).takeover()
      }
    },
    handler: async (request, h) => {
      console.log('new scheme received')
      const scheme = await schemeService.create(request.payload)
      return h.response(scheme).code(200)
    }
  }
}
