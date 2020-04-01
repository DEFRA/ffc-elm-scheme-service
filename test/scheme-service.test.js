
describe('Test scheme service', () => {
  let schemeService
  let mockSchemeRepository
  let mockMessageService

  beforeAll(async () => {
    jest.mock('../server/repository/scheme-repository')
    jest.mock('../server/services/message-service')
  })

  beforeEach(async () => {
    jest.resetModules()
    mockSchemeRepository = require('../server/repository/scheme-repository')
    mockMessageService = require('../server/services/message-service')
    schemeService = require('../server/services/scheme-service')
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  test('Scheme service create works with new scheme', async () => {
    const schemeRecord = {
      schemeId: 'SCHEME123'
    }
    await schemeService.create(schemeRecord)
    expect(mockSchemeRepository.create).toHaveBeenCalledTimes(1)
    expect(mockSchemeRepository.create).lastCalledWith(schemeRecord)
  })

  test('Scheme service create works with existing scheme', async () => {
    mockSchemeRepository.getById.mockResolvedValue({})
    const schemeRecord = {
      schemeId: 'SCHEME123'
    }
    await schemeService.create(schemeRecord)
    expect(mockSchemeRepository.create).toHaveBeenCalledTimes(0)
  })

  test('Scheme service publishes the scheme to the message broker', async () => {
    const schemeRecord = {
      schemeId: 'SCHEME123'
    }
    await schemeService.create(schemeRecord)
    expect(mockMessageService.publishScheme).toHaveBeenCalledTimes(1)
  })

  afterAll(async () => {
    jest.unmock('../server/repository/scheme-repository')
    jest.unmock('../server/services/message-service')
  })
})
