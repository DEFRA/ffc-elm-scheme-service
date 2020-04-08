const db = require('../models')

module.exports = {
  getById: async function (schemeId) {
    return db.schemes.findOne({
      where: {
        schemeId: schemeId
      }
    })
  },
  create: async function (scheme) {
    return db.schemes.upsert({
      schemeId: scheme.schemeId
    })
  }
}
