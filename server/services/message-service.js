const createQueue = require('./messaging/create-queue')
const MessageSender = require('./messaging/message-sender')
const config = require('../config')

const planCommandSender = new MessageSender(config.planCommandQueueConfig, config.planCommandQueueConfig.queueUrl)

async function createQueuesIfRequired () {
  if (config.planCommandQueueConfig.createQueue) {
    console.info('Creating Plan Command queue.')
    try {
      await createQueue(config.planCommandQueueConfig.name, config.planCommandQueueConfig)
    } catch (error) {
      console.error(`Failed to create Plan Command queue. Error: ${error}`)
      throw error
    }
  }
}

async function publishScheme (scheme) {
  try {
    await Promise.all([
      planCommandSender.sendMessage(scheme)
    ])
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function closeConnections () {
  // Nothing to do here as we have no consumers
}

module.exports = {
  closeConnections,
  createQueuesIfRequired,
  publishScheme
}
