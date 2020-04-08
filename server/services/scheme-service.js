const schemeRepository = require('../repository/scheme-repository')
const messageService = require('./message-service')

module.exports = {
  create: async function (scheme) {
    const existingScheme = await schemeRepository.getById(scheme.schemeId)
    if (existingScheme != null) {
      console.log('Found existing scheme ', existingScheme)
      return existingScheme
    }

    console.log('Creating new scheme ', scheme)
    const schemeRecord = await schemeRepository.create(scheme)

    await messageService.publishScheme(scheme)

    return schemeRecord
  }
}
