const createQueue = require('./messaging/create-queue')
const MessageSender = require('./messaging/message-sender')
const config = require('../config')

const planCommandSender = new MessageSender(config.planCommandQueueConfig, config.planCommandQueueConfig.queueUrl)

async function createQueuesIfRequired () {
  if (config.planCommandQueueConfig.createQueue) {
    await createQueue(config.planCommandQueueConfig.name, config.planCommandQueueConfig)
  }
}

async function publishScheme (scheme) {
  try {
    await Promise.all([
      planCommandSender.sendMessage(scheme)
    ])
  } catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  publishScheme,
  createQueuesIfRequired
}
