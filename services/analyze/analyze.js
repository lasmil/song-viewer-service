import { AudioContext } from 'web-audio-api'
import aubio from 'aubiojs'

import { BUFFER_SIZE } from '../../constants.js'

import { createAudioBuffer } from './utils.js'

export async function getFrequencyArray({ fileUri, songPart, totalParts }) {
  if (!fileUri || !songPart || !totalParts) {
    throw new Error('No file provided')
  }
  const audioURL = fileUri
  const audioCtx = new AudioContext()

  const fileFrom = (...args) =>
    import('node-fetch').then(({ fileFrom }) => fileFrom(...args))

  const audioFile = await fileFrom(audioURL).then(response =>
    response.arrayBuffer()
  )
  const audioBuffer = await createAudioBuffer(audioCtx, audioFile)
  const channelData = audioBuffer.getChannelData(0)
  let audioData = Array.prototype.slice.call(channelData) // convert Float32Array to normal array

  let l = parseInt(audioData.length * songPart) / totalParts
  const frequencies = []

  const { Pitch } = await aubio()
  const scriptProcessor = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1)

  const pitchDetector = new Pitch(
    'fcomb',
    scriptProcessor.bufferSize * 4,
    scriptProcessor.bufferSize,
    audioCtx.sampleRate
  )

  while (l > 0) {
    const audioFrame = audioData.splice(audioData.length - l, BUFFER_SIZE)
    let frequency = 0
    if (audioFrame.length === BUFFER_SIZE) {
      frequency = pitchDetector.do(audioFrame)
    }

    frequencies.push(frequency)
    l = l - BUFFER_SIZE
  }

  // plotFrequencies(frequencies)
  return frequencies
}

export async function getSongDuration(fileUri) {
  if (!fileUri) {
    throw new Error('No file provided')
  }
  const audioURL = fileUri
  const audioCtx = new AudioContext()

  const fileFrom = (...args) =>
    import('node-fetch').then(({ fileFrom }) => fileFrom(...args))

  const audioFile = await fileFrom(audioURL).then(response =>
    response.arrayBuffer()
  )
  const audioBuffer = await createAudioBuffer(audioCtx, audioFile)

  return {
    duration: parseInt(audioBuffer?.duration || 0)
  }
}

export function health() {
  return { status: 'ok' }
}
