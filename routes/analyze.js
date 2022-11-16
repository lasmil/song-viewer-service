import fastifyMultipart from '@fastify/multipart'

import {
  getFrequencyArray,
  getSongDuration,
  health
} from '../services/analyze/analyze.js'

export default async fastify => {
  fastify.register(fastifyMultipart)

  fastify.post('/api/getSongDuration', async (request, reply) => {
    const files = await request.saveRequestFiles()

    // check if every file in the files array is an audio type file
    const isAudio =
      files &&
      files.length > 0 &&
      files.every(file => file.mimetype.startsWith('audio/'))

    if (!isAudio) {
      reply.code(400).send({ error: 'Invalid file type' })
    }
    const duration = await getSongDuration(files[0].filepath)
    reply.code(200).header('Access-Control-Allow-Origin', '*').send(duration)
  })

  fastify.post('/api/getFrequencyArray', async (request, reply) => {
    const files = await request.saveRequestFiles()

    const { songpart, totalparts } = request.headers

    // check if every file in the files array is an audio type file
    const isAudio =
      files &&
      files.length > 0 &&
      files.every(file => file.mimetype.startsWith('audio/'))

    if (!isAudio) {
      reply.code(400).send({ error: 'Invalid file type' })
    }
    const frequencyArray = await getFrequencyArray({
      fileUri: files[0].filepath,
      songPart: songpart,
      totalParts: totalparts
    })
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
