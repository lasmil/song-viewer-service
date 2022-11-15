import Fastify from 'fastify'
import pino from 'pino'

import analyze from './routes/analyze.js'

const transport = pino.transport({
  target: 'pino-pretty',
  options: { colorize: true }
})

const logger = pino(
  {
    level: 'info',
    base: null,
    timestamp: false
  },
  transport
)

const fastify = Fastify({
  logger: true
})

fastify.register(analyze)

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    logger.error(err)
  }
  logger.info(`Server listening on ${address}`)
})
