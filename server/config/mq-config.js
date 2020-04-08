const joi = require('@hapi/joi')

const mqSchema = joi.object({

  planCommandQueue: {
    name: joi.string().default('plan-command'),
    endpoint: joi.string().default('http://localhost:9324'),
    queueUrl: joi.string().default('http://localhost:9324/queue/plan-command'),
    region: joi.string().default('eu-west-2'),
    accessKeyId: joi.string(),
    secretAccessKey: joi.string(),
    createQueue: joi.bool().default(true)
  }
})

const mqConfig = {
  planCommandQueue: {
    accessKeyId: process.env.PLAN_CMD_QUEUE_ACCESS_KEY_ID,
    createQueue: process.env.PLAN_CMD_QUEUE_CREATE,
    endpoint: process.env.PLAN_CMD_QUEUE_ENDPOINT,
    name: process.env.PLAN_CMD_QUEUE_NAME,
    queueUrl: process.env.PLAN_CMD_QUEUE_URL,
    region: process.env.PLAN_CMD_QUEUE_REGION,
    secretAccessKey: process.env.PLAN_CMD_QUEUE_ACCESS_KEY
  }
}

const mqResult = mqSchema.validate(mqConfig, {
  abortEarly: false
})

// Throw if config is invalid
if (mqResult.error) {
  throw new Error(`The message queue config is invalid. ${mqResult.error.message}`)
}

const planCommandQueueConfig = { ...mqResult.value.messageQueue, ...mqResult.value.planCommandQueue }

module.exports = {
  planCommandQueueConfig: planCommandQueueConfig
}
