let schemeRepository
let MockSequelize
let mockDb

describe('Test scheme repository', () => {
  beforeAll(async () => {
    jest.mock('../server/models')
    jest.mock('../server/models/scheme', () => {
      MockSequelize = require('sequelize-mock')
      mockDb = new MockSequelize()
      return mockDb.define('schemes', {
        schemeId: 'SCHEME123'
      })
    })
    schemeRepository = require('../server/repository/scheme-repository')
  })

  test('Scheme repository loads object from database', async () => {
    // You have to push a query result into a queue, as the mock db doesn't keep track.
    // Anything you push into the results queue is returned by the next query
    mockDb.$queueResult({
      schemeId: 'SCHEME123'
    })
    const scheme = await schemeRepository.getById('SCHEME123')
    await expect(scheme.schemeId).toEqual('SCHEME123')
  })

  test('Scheme repository creates object in database', async () => {
    mockDb.$queueResult({
      schemeId: 'SCHEME123'
    })
    const scheme = await schemeRepository.create({
      schemeId: 'SCHEME123'
    })
    await expect(scheme.schemeId).toEqual('SCHEME123')
  })

  test('Scheme repository handles database failure', async () => {
    mockDb.$queueFailure(new MockSequelize.ValidationError('Test error'))

    await expect(schemeRepository.getById('SCHEME123')).rejects.toThrow()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    jest.unmock('../server/models/scheme')
    jest.unmock('../server/models')
  })
})
