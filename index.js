import Fastify from 'fastify'

import analyze from './routes/analyze.js'

const fastify = Fastify({
  logger: true
})

fastify.register(analyze)

fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
  }
  fastify.log.info(`Server listening on ${address}`)
})
