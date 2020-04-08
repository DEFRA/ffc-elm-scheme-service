describe('Test scheme model', () => {
  test('Scheme model is created', async () => {
    jest.mock('sequelize', () => {
      const mockSequelize = require('sequelize-mock')
      return mockSequelize
    })

    const schemeModel = require('../../server/models/scheme')

    expect(schemeModel.name).toEqual('')
  })
})
