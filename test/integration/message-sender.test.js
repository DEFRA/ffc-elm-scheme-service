const MessageSender = require('../../server/services/messaging/message-sender')
const createQueue = require('../../server/services/messaging/create-queue')
const purgeQueue = require('../../server/services/messaging/purge-queue')

const config = require('../../server/config')
const queueName = 'testq1'
const queueUrl = `${config.planCommandQueueConfig.endpoint}/queue/${queueName}`

beforeAll(async () => {
  await createQueue(queueName, config.planCommandQueueConfig)
})

afterAll(async () => {
  await purgeQueue(queueUrl, config.planCommandQueueConfig)
})

describe('Send message', () => {
  test('sends a json message', async () => {
    jest.setTimeout(30000)
    const sender = new MessageSender(config.planCommandQueueConfig, queueUrl)
    const result = await sender.sendMessage({ greeting: 'test message' })
    console.log(result)
    expect(result).toBeDefined()
  })
})
