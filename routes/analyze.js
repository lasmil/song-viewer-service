// import S from 'fluent-json-schema'
import fastifyMultipart from '@fastify/multipart'

import { getFrequencyArray, health } from '../services/analyze/analyze.js'

// const schema = {
//   body: S.object().prop('file', S.object().required())
// }

export default async fastify => {
  fastify.register(fastifyMultipart)

  fastify.post('/api/getFrequencyArray', async (request, reply) => {
    const files = await request.saveRequestFiles()

    // check if every file in the files array is an audio type file
    const isAudio =
      files &&
      files.length > 0 &&
      files.every(file => file.mimetype.startsWith('audio/'))

    if (!isAudio) {
      reply.code(400).send({ error: 'Invalid file type' })
    }
    const frequencyArray = await getFrequencyArray(files[0].filepath)
    reply
      .code(200)
      .header('Access-Control-Allow-Origin', '*')
      .send(frequencyArray)
  })

  fastify.get('/api/health', async (request, reply) => {
    const response = health()
    reply.code(200).header('Access-Control-Allow-Origin', '*').send(response)
  })
}
