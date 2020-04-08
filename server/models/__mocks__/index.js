const db = {}

const Sequelize = require('sequelize')

jest.mock('sequelize', () => {
  const mockSequelize = require('sequelize-mock')
  return mockSequelize
})

const sequelize = new Sequelize()
const scheme = require('../scheme')

db.sequelize = sequelize
db.Sequelize = Sequelize
db[scheme.name] = scheme

module.exports = db
