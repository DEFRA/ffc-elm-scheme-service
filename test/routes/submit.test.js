describe('POST /submit', () => {
  const createServer = require('../../server')
  const mockMessageService = require('../../server/services/message-service')
  const mockSchemeRepository = require('../../server/repository/scheme-repository')

  jest.mock('../../server/services/message-service')
  jest.mock('../../server/repository/scheme-repository')

  let server

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
    jest.resetAllMocks()
  })

  test('works with valid content', async () => {
    const options = {
      method: 'POST',
      url: '/submit',
      payload: {
        schemeId: 'SCHEME123'
      }
    }

    const response = await server.inject(options)
    expect(mockSchemeRepository.create).toHaveBeenCalledTimes(1)
    expect(mockMessageService.publishScheme).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(200)
  })

  test('fails with invalid content', async () => {
    const options = {
      method: 'POST',
      url: '/submit',
      payload: { }
    }

    const response = await server.inject(options)
    expect(mockSchemeRepository.create).toHaveBeenCalledTimes(0)
    expect(mockMessageService.publishScheme).toHaveBeenCalledTimes(0)
    expect(response.statusCode).toBe(400)
  })
})
